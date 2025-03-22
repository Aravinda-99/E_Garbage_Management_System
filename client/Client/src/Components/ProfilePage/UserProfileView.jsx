import React from 'react';
import UserProfile from './ProfilePageComponent/UserProfile.jsx';
import RequestTable from '../RequestPage/requestPageComponent/RequestTable.jsx';
import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx';

const UserProfileView = () => {
  const handleDeleteRequest = (request) => {
    console.log('Deleting request:', request);
    // Implement your delete logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar/> */}
      
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
              <RequestTable onDelete={handleDeleteRequest} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfileView;