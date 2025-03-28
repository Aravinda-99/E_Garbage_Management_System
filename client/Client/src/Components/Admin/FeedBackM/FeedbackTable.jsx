import { useState } from 'react';

const FeedbackTable = ({ onDelete, onEdit }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Mock feedback data
  const mockFeedback = [
    {
      feedbackId: 1,
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent service!'
    },
    {
      feedbackId: 2,
      userName: 'Jane Smith',
      rating: 4,
      comment: 'Very good experience.'
    },
    {
      feedbackId: 3,
      userName: 'Michael Johnson',
      rating: 3,
      comment: 'Average service, could be better.'
    },
    {
      feedbackId: 4,
      userName: 'Sarah Williams',
      rating: 5,
      comment: 'Loved it! Highly recommended.'
    },
    {
      feedbackId: 5,
      userName: 'Robert Brown',
      rating: 2,
      comment: 'Not satisfied with the service.'
    }
  ];

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md" style={{ maxHeight: '500px' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`bg-gradient-to-r from-blue-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Comment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" onScroll={handleScroll}>
          {mockFeedback.map((feedback, index) => (
            <tr key={feedback.feedbackId} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition-colors duration-150`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.feedbackId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.rating}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.comment}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(feedback)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(feedback)}
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

export default FeedbackTable;
