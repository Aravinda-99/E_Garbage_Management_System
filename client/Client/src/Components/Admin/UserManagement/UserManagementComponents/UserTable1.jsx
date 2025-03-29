import React, { useState } from 'react';

const UserTable = ({ users, onDelete, onEdit }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (active) => {
    return active 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  // Function to get alternating row background colors
  const getRowBgClass = (index) => {
    return index % 2 === 0 ? 'bg-blue-50' : 'bg-white';
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact Numbers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {users.map((user, index) => (
            <tr key={user.userId} className={`${getRowBgClass(index)} hover:bg-blue-100 transition-colors duration-150`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.userFirstName} {user.userLastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.contactNumbers.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.active)}`}>
                  {user.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
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

export default UserTable;