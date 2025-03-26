import React, { useState, useEffect } from 'react';

const StatusChangeTable = ({ request, onStatusChange, onCancel }) => {
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = ['NEW', 'PENDING', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

  useEffect(() => {
    if (request) {
      console.log('Selected Request:', request); // Debug log
      setStatus(request.status || 'NEW');
      setError(null);
    }
  }, [request]);

  const handleSubmit = async () => {
    console.log('Current Request:', request); // Debug log
    console.log('Selected Status:', status); // Debug log

    // More robust validation
    if (!status) {
      setError('Please select a status');
      return;
    }

    // Additional logging and validation
    if (!request) {
      setError('No request selected');
      return;
    }

    if (!request.requestId) {
      console.error('Request is missing ID:', request);
      setError('Invalid request - missing ID');
      return;
    }

    setIsUpdating(true);
    setError(null);
    
    try {
      await onStatusChange(request.requestId, status);
      onCancel(); // Close the status change form after successful update
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadgeClass = (statusValue) => {
    switch (statusValue) {
      case 'NEW': return 'bg-yellow-200 text-yellow-800';
      case 'PENDING': return 'bg-blue-100 text-blue-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-200 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!request) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Update Request Status: {request.eventType || 'Event'} for {request.requesterName || 'User'}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Requester:</p>
            <p className="text-md font-medium">{request.requesterName || 'N/A'}</p>
            <p className="text-sm text-gray-600">{request.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Event Details:</p>
            <p className="text-md font-medium">{request.eventType || 'N/A'}</p>
            <p className="text-sm text-gray-600">Location: {request.location || 'N/A'}</p>
            <p className="text-sm text-gray-600">
              Date/Time: {request.eventDate || 'N/A'} at {request.eventTime || 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Status
            </label>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
              {request.status || 'UNKNOWN'}
            </span>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
            {request && (
              <details className="mt-2 text-xs">
                <summary>Request Details</summary>
                <pre className="bg-gray-100 p-2 rounded">
                  {JSON.stringify(request, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
        
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            disabled={isUpdating}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeTable;