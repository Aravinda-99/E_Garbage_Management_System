import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Bell, ChevronDown, Download, FileText } from 'lucide-react';
import AdminRequestTable from './RMcomponent/AdminRequestTable';
import StatusChangeTable from './RMcomponent/StatusChangeTable';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const RequestManagementOverview = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const API_BASE_URL = "http://localhost:8045/api/v1/request";

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-all-request`);
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDeleteRequest = async (request) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the request for ${request.eventType}?`);
    
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/delete-request/${request.requestId}`);
        setRequests(requests.filter(req => req.requestId !== request.requestId));
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete request');
      }
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      console.log('Attempting to update status:', { requestId, newStatus });
      
      const response = await axios.put(
        `${API_BASE_URL}/${requestId}/update-status`, 
        { status: newStatus }
      );
      
      console.log('Status update response:', response.data);
      
      const updatedRequests = requests.map(req => 
        req.requestId === requestId ? { ...req, status: newStatus } : req
      );
      
      setRequests(updatedRequests);
      setSelectedRequest(null);
      
      return response.data;
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      
      throw new Error(
        err.response?.data?.message || 
        err.message || 
        'Failed to update status'
      );
    }
  };

  const statusCounts = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {});

  // Fixed generatePDF function that properly displays all fields
// Fixed generatePDF function that properly displays all fields
const generatePDF = () => {
  setPdfGenerating(true);
  
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF('landscape');
    
    // Set title
    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text('Cleaning Services - Request Management Report', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    // Add company info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Clean Services Inc.', doc.internal.pageSize.width - 80, 20);
    doc.text('123 Cleaning Way, Suite 100', doc.internal.pageSize.width - 80, 25);
    doc.text('contact@cleanservices.com', doc.internal.pageSize.width - 80, 30);
    
    // Add status summary
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text('Request Status Summary:', 14, 40);
    
    const statusTableData = Object.entries(statusCounts).map(([status, count]) => [
      status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' '),
      count.toString()
    ]);
    
    // Create status summary table
    autoTable(doc, {
      startY: 45,
      head: [['Status', 'Count']],
      body: statusTableData,
      theme: 'striped',
      headStyles: { fillColor: [66, 139, 202], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [245, 250, 254] },
      alternateRowStyles: { fillColor: [235, 245, 253] }
    });
    
    // Add request details section
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text('Request Details:', 14, doc.lastAutoTable.finalY + 15);
    
    // Create request details table with properly extracted data
    const requestTableData = requests.map(req => {
      // Format date and time using the correct properties (eventDate and eventTime)
      let formattedDateTime = 'N/A';
      if (req.eventDate) {
        formattedDateTime = req.eventDate;
        if (req.eventTime) {
          formattedDateTime += `\n${req.eventTime}`;
        }
      } else {
        // Fallback: Try to format using createdDate or date
        try {
          const dateValue = req.createdDate || req.date;
          if (dateValue) {
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
              // Format as YYYY-MM-DD HH:MM:SS
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              
              formattedDateTime = `${year}-${month}-${day}\n${hours}:${minutes}`;
            }
          }
        } catch (err) {
          console.error('Date parsing error:', err);
          formattedDateTime = 'Invalid Format';
        }
      }
      
      // Extract requester name using the exact field name from AdminRequestTable
      const requesterName = req.requesterName || // Correct field from AdminRequestTable
                           req.requester || 
                           (req.name ? req.name : 
                           (req.email ? req.email.split('@')[0] : 'N/A'));
      
      // Get cleaners count using the numberOfCleaners field as shown in AdminRequestTable
      const cleanersCount = req.numberOfCleaners?.toString() || 
                           req.cleaners?.toString() || '0';
      
      return [
        requesterName,
        req.email || 'N/A',
        req.eventType || 'N/A',
        req.location || 'N/A',
        formattedDateTime,
        req.status || 'N/A',
        cleanersCount  // Use the correct field for cleaners count
      ];
    });
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Requester', 'Email', 'Event Type', 'Location', 'Date & Time', 'Status', 'Cleaners']],
      body: requestTableData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202], textColor: [255, 255, 255] },
      styles: { overflow: 'ellipsize', cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 30 },  // Requester
        1: { cellWidth: 50 },  // Email
        2: { cellWidth: 35 },  // Event Type
        3: { cellWidth: 30 },  // Location
        4: { cellWidth: 35 },  // Date & Time
        5: { cellWidth: 30 },  // Status
        6: { cellWidth: 20 }   // Cleaners
      }
    });
    
    // Save the PDF
    doc.save('cleaning-services-request-report.pdf');
    
    // Notify success
    alert('PDF report generated successfully!');
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF report');
  } finally {
    setPdfGenerating(false);
  }
};

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Newly Added Header Component */}
      <motion.header 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </motion.div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Request Management</h1>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.button
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generatePDF}
                disabled={pdfGenerating || requests.length === 0}
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {pdfGenerating ? 'Generating...' : 'Generate Report'}
                </span>
              </motion.button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <motion.input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5 text-gray-500" />
              </motion.button>
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">A</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <div className="p-6 flex-grow">        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {['NEW', 'PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
            <motion.div 
              key={status} 
              className="bg-white overflow-hidden shadow rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${
                    status === 'NEW' ? 'bg-yellow-500' :
                    status === 'PENDING' ? 'bg-blue-500' :
                    status === 'APPROVED' ? 'bg-green-500' :
                    status === 'IN_PROGRESS' ? 'bg-purple-500' : 'bg-green-700'
                  }`}>
                    <div className="h-6 w-6 text-white">
                      {status === 'NEW' ? '🆕' :
                       status === 'PENDING' ? '🔄' :
                       status === 'APPROVED' ? '✓' :
                       status === 'IN_PROGRESS' ? '🛠️' : '✅'}
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')} Requests
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">{statusCounts[status] || 0}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Requests</h2>
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePDF}
              disabled={pdfGenerating || requests.length === 0}
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">
                {pdfGenerating ? 'Processing...' : 'Download PDF'}
              </span>
            </motion.button>
          </div>
          <AdminRequestTable 
            requests={requests.filter(request => 
              searchQuery ? 
              JSON.stringify(request).toLowerCase().includes(searchQuery.toLowerCase()) : 
              true
            )}
            onDelete={handleDeleteRequest}
            onSelectRequest={setSelectedRequest}
          />
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Update Request Status</h2>
          {selectedRequest ? (
            <StatusChangeTable
              request={selectedRequest}
              onStatusChange={handleStatusChange}
              onCancel={() => setSelectedRequest(null)}
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-600">Select a request from the table above to update its status.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RequestManagementOverview;