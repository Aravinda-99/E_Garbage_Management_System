import React, { useState } from 'react';

const AdminRequestTable = ({ requests, onDelete, onSelectRequest }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'NEW': return 'bg-yellow-200 text-yellow-800';
      case 'PENDING': return 'bg-blue-100 text-blue-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-200 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (requests.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No requests found
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-lg border border-gray-200" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requester</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Event Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cleaners</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {requests.map((request, index) => (
            <tr 
              key={`${request.requestId}-${index}`} 
              className="hover:bg-blue-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.requesterName}</div>
                <div className="text-xs text-gray-500">{request.email}</div>
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
                    className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => onDelete(request)}
                    className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestTable;