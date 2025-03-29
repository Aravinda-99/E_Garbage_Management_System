import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './ProfilePageComponent/UserProfile.jsx';
import RequestTable from '../RequestPage/requestPageComponent/RequestTable.jsx';
import UpdateRequestForm from '../RequestPage/requestPageComponent/UpdateRequestForm.jsx';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import FeedbackInPTable from './ProfilePageComponent/FeedbackInPTable.jsx';

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
    const confirmDelete = window.confirm('Are you sure you want to delete this request?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/delete-request/${request.requestId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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
      <Navbar />
      <ToastContainer />

      <div className="flex-grow bg-gray-50">
        <UserProfile />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-8">
          {/* Cleaning Requests Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
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

          {/* Feedback Section */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">My Feedback</h2>
            </div>

            <div className="p-6">
              <FeedbackInPTable />
            </div>
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
                  ×
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

        {/* Call to Action */}
        {/* <div className="mt-20 bg-gradient-to-r bg-emerald-900 to-teal-600 rounded-2xl shadow-xl overflow-hidden mx-4">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Want to install smart bins in your area?
                </h2>
                <p className="mt-4 text-emerald-100 max-w-2xl mx-auto">
                  Join our smart city initiative and contribute to cleaner, more sustainable urban environments.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <button className="px-6 py-3 bg-white text-emerald-700 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Request Installation
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300">
                    Learn About Our Program
                  </button>
                </div>
              </div>
            </div>
          </div> */}

        {/* Call to Action */}
        <div className="mt-8 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-600 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10 text-center">
              <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                Want to install smart bins in your area?
              </h2>
              <p className="mt-4 text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
                Join our smart city initiative and contribute to cleaner, more sustainable urban environments.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-emerald-700 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Request Installation
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                  Learn About Our Program
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default UserProfileView;