import { useState } from 'react';

const UserTable = ({ onDelete, onEdit }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Mock user data based on your backend model
  const mockUsers = [
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
    },
    {
      userId: 4,
      userFirstName: 'Sarah',
      userLastName: 'Williams',
      contactNumbers: ['444-555-6666', '777-888-9999'],
      email: 'sarah.williams@example.com',
      active: true
    },
    {
      userId: 5,
      userFirstName: 'Robert',
      userLastName: 'Brown',
      contactNumbers: ['222-333-4444'],
      email: 'robert.brown@example.com',
      active: true
    },
    {
      userId: 6,
      userFirstName: 'Emily',
      userLastName: 'Davis',
      contactNumbers: ['666-777-8888'],
      email: 'emily.davis@example.com',
      active: false
    }
  ];

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Contact Numbers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {mockUsers.map((user, index) => (
            <tr key={user.userId} className={`${getRowBgClass(index)} hover:bg-blue-100 transition-colors duration-150`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.userFirstName} {user.userLastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
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
                    onClick={() => onEdit && onEdit(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(user)}
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