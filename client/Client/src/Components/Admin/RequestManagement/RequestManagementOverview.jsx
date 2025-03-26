import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminRequestTable from './RMcomponent/AdminRequestTable';
import StatusChangeTable from './RMcomponent/StatusChangeTable';

const RequestManagementOverview = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        await axios.delete(`${API_BASE_URL}/${request.requestId}`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Request Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {['NEW', 'PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
          <div key={status} className="bg-white overflow-hidden shadow rounded-lg">
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
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold">All Requests</h2>
        <AdminRequestTable 
          requests={requests}
          onDelete={handleDeleteRequest}
          onSelectRequest={setSelectedRequest}
        />
      </div>

      <div className="mt-8">
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
      </div>
    </div>
  );
};

export default RequestManagementOverview;