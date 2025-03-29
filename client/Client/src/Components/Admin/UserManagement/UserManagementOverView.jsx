import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Bell, ChevronDown } from 'lucide-react';
import UserTable from './UserManagementComponents/UserTable1';
import AddUserForm from './UserManagementComponents/AddUserForm';
import EditUserForm from './UserManagementComponents/EditUserForm';

const UserManagementOverView = () => {
  const [users, setUsers] = useState([
    {
      userId: 1,
      userFirstName: 'John',
      userLastName: 'Doe',
      contactNumbers: ['123-456-7890', '098-765-4321'],
      email: 'john.doe@example.com',
      active: true
    },
    {
      userId: 2,
      userFirstName: 'Jane',
      userLastName: 'Smith',
      contactNumbers: ['555-123-4567'],
      email: 'jane.smith@example.com',
      active: true
    },
    {
      userId: 3,
      userFirstName: 'Michael',
      userLastName: 'Johnson',
      contactNumbers: ['111-222-3333'],
      email: 'michael.johnson@example.com',
      active: false
    }
  ]);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Statistics
  const userStats = {
    total: users.length,
    active: users.filter(user => user.active).length,
    inactive: users.filter(user => !user.active).length
  };

  // Add User Handler
  const handleAddUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setShowAddUserForm(false);
  };

  // Delete User Handler
  const handleDeleteUser = (userToDelete) => {
    setUsers(prevUsers =>
      prevUsers.filter(user => user.userId !== userToDelete.userId)
    );
  };

  // Edit User Handler
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Update User Handler
  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Component */}
      <motion.header 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </motion.div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">User Management</h1>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <motion.input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5 text-gray-500" />
              </motion.button>
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">A</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="p-6">
        {/* User Statistics */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: 'total',
                bgColor: 'bg-blue-500',
                label: 'Total Users',
                value: userStats.total,
                description: 'All registered users in the system'
              },
              {
                icon: 'active',
                bgColor: 'bg-green-500',
                label: 'Active Users',
                value: userStats.active,
                description: 'Users currently active'
              },
              {
                icon: 'inactive',
                bgColor: 'bg-purple-500',
                label: 'Inactive Users',
                value: userStats.inactive,
                description: 'Users not recently active'
              }
            ].map(({ icon, bgColor, label, value, description }) => (
              <div key={label} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
                      {icon === 'total' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.481-.634-2.226M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.481.634-2.226M14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      {icon === 'active' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {icon === 'inactive' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-400 mt-1">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Management Actions */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
          <button
            onClick={() => setShowAddUserForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add New User
          </button>
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />

        {/* Add User Form (Conditional Rendering) */}
        {showAddUserForm && (
          <AddUserForm
            onAddUser={handleAddUser}
            onCancel={() => setShowAddUserForm(false)}
          />
        )}

        {/* Edit User Form (Conditional Rendering) */}
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onUpdateUser={handleUpdateUser}
            onCancel={() => setEditingUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagementOverView;