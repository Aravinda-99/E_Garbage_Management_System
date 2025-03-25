import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatusChangeTable from '../RequestManagement/RMcomponent/StatusChangeTable.jsx';
import AdminRequestTable from './RMcomponent/AdminRequestTable.jsx';

const RequestManagementOverview = () => {
  // State management
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API configuration
  const API_BASE_URL = 'http://localhost:8045/api/v1/request';

  // Fetch requests from backend
  useEffect(() => {
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

    fetchRequests();
  }, []);

  // Request management handlers
  const handleDeleteRequest = async (request) => {
    try {
      await axios.delete(`${API_BASE_URL}/${request.id}`);
      setRequests(requests.filter(req => req.id !== request.id));
    } catch (err) {
      console.error('Error deleting request:', err);
      // Consider adding user-friendly error notification
    }
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleStatusChange = async (requestId, updateDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${requestId}/update-status`, updateDTO);
      
      setRequests(requests.map(req => 
        req.id === requestId ? response.data : req
      ));
      
      setSelectedRequest(null);
    } catch (err) {
      console.error('Error updating request status:', err);
      // Consider adding user-friendly error notification
    }
  };

  // Request status counters
  const getRequestStatusCount = (status) => 
    requests.filter(req => req.status.toUpperCase() === status).length;

  const statusCounts = {
    newRequests: getRequestStatusCount('NEW'),
    pendingRequests: getRequestStatusCount('PENDING'),
    confirmedRequests: getRequestStatusCount('CONFIRMED'),
    completedRequests: getRequestStatusCount('COMPLETED')
  };

  // Render loading and error states
  if (loading) return <div className="text-center py-10">Loading requests...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Request Management Dashboard</h1>
        
        {/* Request Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'New Requests', count: statusCounts.newRequests, emoji: '🆕', bgColor: 'bg-yellow-500' },
            { label: 'Pending Requests', count: statusCounts.pendingRequests, emoji: '🔄', bgColor: 'bg-blue-500' },
            { label: 'Confirmed Requests', count: statusCounts.confirmedRequests, emoji: '✓', bgColor: 'bg-green-500' },
            { label: 'Completed Requests', count: statusCounts.completedRequests, emoji: '✅', bgColor: 'bg-purple-500' }
          ].map(({ label, count, emoji, bgColor }) => (
            <div key={label} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-5 flex items-center">
                <div className={`flex-shrink-0 ${bgColor} rounded-md p-3 mr-4`}>
                  <span className="text-white text-2xl">{emoji}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Request Management Sections */}
        <div className="grid grid-cols-1 gap-8">
          {/* Admin Requests Table Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">All Requests</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Add New Request
              </button>
            </div>
            
            <AdminRequestTable 
              onDelete={handleDeleteRequest}
              onSelectRequest={handleSelectRequest}
            />
          </div>

          {/* Status Change Section */}
          {selectedRequest && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Request Status</h2>
              
              <StatusChangeTable
                request={selectedRequest}
                onStatusChange={(requestId, status, cleaners) => 
                  handleStatusChange(requestId, {
                    status: status,
                    numberOfCleaners: cleaners.length,
                    assignedCleaners: cleaners
                  })
                }
                onCancel={() => setSelectedRequest(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagementOverview;