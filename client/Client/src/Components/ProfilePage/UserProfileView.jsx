import React, { useState } from 'react';
import UserProfile from './ProfilePageComponent/UserProfile.jsx';
import RequestTable from '../RequestPage/requestPageComponent/RequestTable.jsx';
import UpdateRequestForm from '../RequestPage/requestPageComponent/UpdateRequestForm.jsx';
import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx';

const UserProfileView = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleDeleteRequest = async (request) => {
    try {
      // Implement your delete logic here
      console.log('Deleting request:', request);
      // Example delete API call
      // await axios.delete(`${API_BASE_URL}/delete/${request.requestId}`);
      // Refresh the request list or remove the request from state
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseUpdateForm = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-50">
        {/* Profile Section */}
        <UserProfile />
        
        {/* Requests Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">My Cleaning Requests</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your cleaning requests and appointments</p>
            </div>
            
            <div className="p-6">
              <RequestTable 
                onDelete={handleDeleteRequest} 
                onSelectRequest={handleSelectRequest} 
              />
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
                  &times;
                </button>
                <UpdateRequestForm 
                  requestId={selectedRequest.requestId} 
                  initialData={selectedRequest} 
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