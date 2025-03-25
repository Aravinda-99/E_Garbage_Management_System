import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestTable from '../../RequestPage/requestPageComponent/RequestTable.jsx';
import StatusChangeTable from '../RequestManagement/RMcomponent/StatusChangeTable.jsx';

const RequestManagementOverview = () => {
  // State to store all requests
  const [requests, setRequests] = useState([]);
  // State to track which request is selected for status change
  const [selectedRequest, setSelectedRequest] = useState(null);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8045/api/v1/request/get-all-request');
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handler functions for the request table
  const handleDeleteRequest = async (request) => {
    try {
      await axios.delete(`http://localhost:8045/api/v1/request/${request.id}`);
      setRequests(requests.filter(req => req.id !== request.id));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  // Handler to select a request for status change
  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  // Handler to update request status
  const handleStatusChange = async (requestId, updateDTO) => {
    try {
      const response = await axios.put(`http://localhost:8045/api/v1/request/${requestId}/update-status`, updateDTO);
      
      // Update the requests list with the updated request
      setRequests(requests.map(req => 
        req.id === requestId ? response.data : req
      ));
      
      // Clear the selected request
      setSelectedRequest(null);
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  // Count requests by status
  const newRequests = requests.filter(req => req.status === 'NEW').length;
  const pendingRequests = requests.filter(req => req.status === 'PENDING').length;
  const confirmedRequests = requests.filter(req => req.status === 'CONFIRMED').length;
  const completedRequests = requests.filter(req => req.status === 'COMPLETED').length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Request Management</h1>
      
      {/* Request Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <div className="h-6 w-6 text-white">🆕</div>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">New Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{newRequests}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <div className="h-6 w-6 text-white">🔄</div>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Pending Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingRequests}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <div className="h-6 w-6 text-white">✓</div>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Confirmed Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{confirmedRequests}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <div className="h-6 w-6 text-white">✅</div>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Completed Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{completedRequests}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Request Table Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Requests</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add New Request
          </button>
        </div>
        
        <RequestTable 
          requests={requests}
          onDelete={handleDeleteRequest}
          onSelectRequest={handleSelectRequest}
        />
      </div>

      {/* Status Change Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Update Request Status</h2>
        
        {selectedRequest ? (
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