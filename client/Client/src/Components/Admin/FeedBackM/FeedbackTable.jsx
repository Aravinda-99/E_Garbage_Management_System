import { useState, useEffect } from 'react';
import { Pencil, Trash2, RefreshCw } from 'lucide-react';

const FeedbackTable = ({ onDelete, onEdit, refreshTrigger }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Fetch feedback data from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8045/api/v1/feedback/get-all-FeedBack');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeedbacks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching feedback data:', err);
        setError('Failed to load feedback data. Please try again later.');
        // Use mock data as fallback when API fails
        setFeedbacks([
          { feedbackId: 1, username: 'John Doe', rating: 5, message: 'Excellent service!' },
          { feedbackId: 2, username: 'Jane Smith', rating: 4, message: 'Very good experience.' },
          { feedbackId: 3, username: 'Michael Johnson', rating: 3, message: 'Average service, could be better.' },
          { feedbackId: 4, username: 'Sarah Williams', rating: 5, message: 'Loved it! Highly recommended.' },
          { feedbackId: 5, username: 'Robert Brown', rating: 2, message: 'Not satisfied with the service.' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  const handleRefresh = () => {
    setLoading(true);
    fetch('http://localhost:8045/api/v1/feedback/get-all-FeedBack')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setFeedbacks(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error refreshing feedback data:', err);
        setError('Failed to refresh data');
      })
      .finally(() => setLoading(false));
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-green-800">User Feedback</h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 py-1 px-3 rounded-md transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div 
        className="overflow-auto rounded-lg border border-gray-200 shadow-md" 
        style={{ maxHeight: '500px' }}
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No feedback submissions yet
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`bg-gradient-to-r from-green-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbacks.map((feedback, index) => (
                <tr 
                  key={feedback.feedbackId} 
                  className={`${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} hover:bg-green-100 transition-colors duration-150`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.feedbackId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {renderStars(feedback.rating)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{feedback.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit && onEdit(feedback)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150 flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(feedback.feedbackId)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FeedbackTable;