import { useState } from 'react';

const RequestTable = ({ onDelete }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  const mockRequests = [
    {
      id: 1,
      requesterName: 'John Doe',
      email: 'john.doe@example.com',
      contactNumbers: '123-456-7890',
      eventType: 'Birthday Party',
      location: '123 Main St',
      eventDate: '2024-03-15',
      eventTime: '18:00',
      status: 'Pending',
      assignedCleaners: ['Alice', 'Bob'],
    },
    {
      id: 2,
      requesterName: 'Jane Smith',
      email: 'jane.smith@example.com',
      contactNumbers: '987-654-3210',
      eventType: 'Corporate Event',
      location: '456 Oak Ave',
      eventDate: '2024-03-22',
      eventTime: '10:00',
      status: 'Confirmed',
      assignedCleaners: ['Charlie', 'David', 'Eva'],
    },
    {
      id: 3,
      requesterName: 'Peter Jones',
      email: 'peter.jones@example.com',
      contactNumbers: '111-222-3333',
      eventType: 'Wedding Reception',
      location: '789 Pine Ln',
      eventDate: '2024-04-01',
      eventTime: '20:00',
      status: 'Completed',
      assignedCleaners: ['Frank', 'Grace'],
    },
    {
      id: 4,
      requesterName: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      contactNumbers: '444-555-6666',
      eventType: 'House Cleaning',
      location: '101 Elm Rd',
      eventDate: '2024-04-10',
      eventTime: '14:00',
      status: 'Pending',
      assignedCleaners: ['Hannah'],
    },
    {
      id: 5,
      requesterName: 'Mike Brown',
      email: 'mike.brown@example.com',
      contactNumbers: '777-888-9999',
      eventType: 'Office Cleaning',
      location: '202 Maple Dr',
      eventDate: '2024-04-18',
      eventTime: '09:00',
      status: 'Confirmed',
      assignedCleaners: ['Isaac', 'Jack'],
    },
    {
      id: 6,
      requesterName: 'Emily Davis',
      email: 'emily.davis@example.com',
      contactNumbers: '333-222-1111',
      eventType: 'Party Cleaning',
      location: '303 Birch Ct',
      eventDate: '2024-04-25',
      eventTime: '16:00',
      status: 'Completed',
      assignedCleaners: ['Kelly'],
    }
  ];

  // Function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get alternating row background colors
  const getRowBgClass = (index) => {
    return index % 2 === 0 ? 'bg-blue-50' : 'bg-white';
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Event Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Assigned Cleaners
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {mockRequests.map((request, index) => (
            <tr key={request.id} className={`${getRowBgClass(index)} hover:bg-blue-100 transition-colors duration-150`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.eventType}</div>
                <div className="text-xs text-gray-500">{request.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.eventDate}</div>
                <div className="text-xs text-gray-500">{request.eventTime}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.assignedCleaners.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onDelete(request)}
                    className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50">
                    Edit
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

export default RequestTable;