import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Bell, ChevronDown } from 'lucide-react';
import AdminRequestTable from './RMcomponent/AdminRequestTable';
import StatusChangeTable from './RMcomponent/StatusChangeTable';

const RequestManagementOverview = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
          <h2 className="text-xl font-semibold">All Requests</h2>
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