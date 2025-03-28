import { useState } from 'react';

const ComplaintTable = ({ onDelete, onEdit }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Mock complaint data
  const mockComplaints = [
    {
      complaintId: 1,
      userName: 'John Doe',
      complaint: 'Poor quality product received',
      image: 'product.jpg'
    },
    {
      complaintId: 2,
      userName: 'Jane Smith',
      complaint: 'Late delivery by 3 days',
      image: 'delivery.jpg'
    },
    {
      complaintId: 3,
      userName: 'Michael Johnson',
      complaint: 'Damaged packaging',
      image: 'packaging.jpg'
    },
    {
      complaintId: 4,
      userName: 'Sarah Williams',
      complaint: 'Wrong item shipped',
      image: 'wrong-item.jpg'
    },
    {
      complaintId: 5,
      userName: 'Robert Brown',
      complaint: 'Customer service was rude',
      image: 'service.jpg'
    }
  ];

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Complaint</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {mockComplaints.map((complaint, index) => (
            <tr key={complaint.complaintId} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors duration-150`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.complaintId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.userName}</td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{complaint.complaint}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-md object-cover" src={complaint.image} alt="Complaint evidence" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(complaint)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(complaint)}
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

export default ComplaintTable;