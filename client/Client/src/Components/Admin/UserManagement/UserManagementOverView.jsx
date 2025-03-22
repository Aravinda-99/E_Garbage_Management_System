import React, { useState } from 'react';
import UserStatistics from '../dashbordComponent/UserStatistics.jsx';
import UserTable from './UserManagementComponents/UserTable.jsx';

const UserManagementOverView = () => {
  // Mock data for user statistics
  const userStats = {
    citizens: 1254,
    collectors: 78,
    admins: 12
  };

  // Handler functions for the user table
  const handleDeleteUser = (user) => {
    console.log('Delete user:', user);
    // Implement delete functionality here
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    // Implement edit functionality here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      {/* User Statistics Cards */}
      <UserStatistics userStats={userStats} />
      
      {/* User Table Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add New User
          </button>
        </div>
        
        <UserTable 
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />
      </div>
    </div>
  );
};

export default UserManagementOverView;