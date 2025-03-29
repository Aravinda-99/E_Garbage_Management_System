import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8045/api/v1/request"; // Replace with your backend URL

const RequestTable = ({ onDelete, onSelectRequest }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Fetch all requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-all-request`);
        setRequests(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-yellow-200 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get alternating row background colors
  const getRowBgClass = (index) => {
    return index % 2 === 0 ? 'bg-blue-50' : 'bg-white';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-auto rounded-lg border border-gray-200" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Requester
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Event Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              No of Cleaners
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={request.requestId} className={`${getRowBgClass(index)} hover:bg-blue-100 transition-colors duration-150`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.requesterName}</div>
                  <div className="text-xs text-gray-500">{request.email}</div>
                  <div className="text-xs text-gray-500">{request.contactNumbers}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.eventType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{request.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{request.eventDate}</div>
                  <div className="text-xs text-gray-500">{request.eventTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.numberOfCleaners || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onSelectRequest(request)}
                      className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition-colors duration-150"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(request)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;