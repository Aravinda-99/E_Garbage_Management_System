import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './ProfilePageComponent/UserProfile.jsx';
import RequestTable from '../RequestPage/requestPageComponent/RequestTable.jsx';
import UpdateRequestForm from '../RequestPage/requestPageComponent/UpdateRequestForm.jsx';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

const API_BASE_URL = "http://localhost:8045/api/v1/request";

const UserProfileView = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch requests from backend
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/get-all-request`);
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch requests');
      toast.error('Unable to load requests');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle request deletion
  const handleDeleteRequest = async (request) => {
    // Confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this request?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/delete-request/${request.requestId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Remove request from local state
      setRequests(prevRequests => 
        prevRequests.filter(req => req.requestId !== request.requestId)
      );
      
      toast.success(response.data || 'Request deleted successfully');
    } catch (error) {
      console.error('Error deleting request:', error.response?.data || error.message);
      toast.error(error.response?.data || 'Failed to delete request');
    }
  };

  // Select request for updating
  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  // Close update form
  const handleCloseUpdateForm = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <ToastContainer />
      
      <div className="flex-grow bg-gray-50">
        <UserProfile />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">My Cleaning Requests</h2>
            </div>
            
            {isLoading ? (
              <div className="p-6 text-center">Loading requests...</div>
            ) : error ? (
              <div className="p-6 text-red-500">{error}</div>
            ) : (
              <div className="p-6">
                <RequestTable 
                  requests={requests}
                  onDelete={handleDeleteRequest} 
                  onSelectRequest={handleSelectRequest} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Update Request Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-4xl mx-auto my-8">
              <div className="bg-white rounded-lg shadow-xl relative">
                <button 
                  onClick={handleCloseUpdateForm}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-60 text-2xl"
                >
                  &times;
                </button>
                <UpdateRequestForm 
                  requestId={selectedRequest.requestId} 
                  initialData={selectedRequest} 
                  onClose={handleCloseUpdateForm}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserProfileView;