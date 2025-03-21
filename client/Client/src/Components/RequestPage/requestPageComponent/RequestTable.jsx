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
        id:4,
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
        id:5,
        requesterName: 'Mike Brown',
        email: 'mike.brown@example.com',
        contactNumbers: '777-888-9999',
        eventType: 'Office Cleaning',
        location: '202 Maple Dr',
        eventDate: '2024-04-18',
        eventTime: '09:00',
        status: 'Confirmed',
        assignedCleaners: ['Isaac','Jack'],
    },
      {
        id:6,
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

  return (
    <div className="relative overflow-auto h-80 rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full">
        <thead
          className={`sticky top-0 bg-white transition-shadow ${
            scrolled ? 'shadow-sm' : ''
          }`}
        >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Requester Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Numbers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned Cleaners
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200" onScroll={handleScroll}>
          {mockRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.requesterName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.contactNumbers}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.eventType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.eventDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.eventTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.assignedCleaners.join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => onDelete(request)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;