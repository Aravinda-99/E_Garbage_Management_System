import React, { useState } from 'react';
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
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* User Statistics */}
      {/* <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-blue-800">{userStats.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-green-800">{userStats.active}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Inactive Users</h3>
          <p className="text-2xl font-bold text-red-800">{userStats.inactive}</p>
        </div>
      </div> */}

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
  );
};

export default UserManagementOverView;