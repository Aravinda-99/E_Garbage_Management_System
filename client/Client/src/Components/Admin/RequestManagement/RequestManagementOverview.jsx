import React, { useState, useEffect } from 'react';
import RequestTable from '../../RequestPage/requestPageComponent/RequestTable.jsx';
import StatusChangeTable from '../RequestManagement/RMcomponent/StatusChangeTable.jsx';

const RequestManagementOverview = () => {
  // State to store all requests
  const [requests, setRequests] = useState([]);
  // State to track which request is selected for status change
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Mock function to fetch requests (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate fetching user-created requests
    const mockUserRequests = [
      {
        id: 1,
        requesterName: 'John Doe',
        email: 'john.doe@example.com',
        contactNumbers: '123-456-7890',
        eventType: 'Birthday Party',
        location: '123 Main St',
        eventDate: '2024-03-15',
        eventTime: '18:00',
        status: 'New', // Default status for new requests
        assignedCleaners: [],
      },
      {
        id: 2,
        requesterName: 'Jane Smith',
        email: 'jane.smith@example.com',
        contactNumbers: '987-654-3210',
        eventType: 'Corporate Event',
        location: '456 Oak Ave',
        eventDate: '2024-03-22',
        eventTime: '10:00',
        status: 'New',
        assignedCleaners: [],
      },
      {
        id: 3,
        requesterName: 'Peter Jones',
        email: 'peter.jones@example.com',
        contactNumbers: '111-222-3333',
        eventType: 'Wedding Reception',
        location: '789 Pine Ln',
        eventDate: '2024-04-01',
        eventTime: '20:00',
        status: 'New',
        assignedCleaners: [],
      },
      {
        id: 4,
        requesterName: 'Sarah Lee',
        email: 'sarah.lee@example.com',
        contactNumbers: '444-555-6666',
        eventType: 'House Cleaning',
        location: '101 Elm Rd',
        eventDate: '2024-04-10',
        eventTime: '14:00',
        status: 'Pending',
        assignedCleaners: [],
      },
      {
        id: 5,
        requesterName: 'Mike Brown',
        email: 'mike.brown@example.com',
        contactNumbers: '777-888-9999',
        eventType: 'Office Cleaning',
        location: '202 Maple Dr',
        eventDate: '2024-04-18',
        eventTime: '09:00',
        status: 'Confirmed',
        assignedCleaners: ['Isaac', 'Jack'],
      },
      {
        id: 6,
        requesterName: 'Emily Davis',
        email: 'emily.davis@example.com',
        contactNumbers: '333-222-1111',
        eventType: 'Party Cleaning',
        location: '303 Birch Ct',
        eventDate: '2024-04-25',
        eventTime: '16:00',
        status: 'Completed',
        assignedCleaners: ['Kelly'],
      }
    ];
    
    setRequests(mockUserRequests);
  }, []);

  // Handler functions for the request table
  const handleDeleteRequest = (request) => {
    setRequests(requests.filter(req => req.id !== request.id));
  };

  // Handler to select a request for status change
  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  // Handler to update request status
  const handleStatusChange = (requestId, newStatus, assignedCleaners) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: newStatus, assignedCleaners: assignedCleaners } 
        : req
    ));
    
    // After updating, clear the selection
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(null);
    }
  };

  // Count requests by status
  const newRequests = requests.filter(req => req.status === 'New').length;
  const pendingRequests = requests.filter(req => req.status === 'Pending').length;
  const confirmedRequests = requests.filter(req => req.status === 'Confirmed').length;
  const completedRequests = requests.filter(req => req.status === 'Completed').length;

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