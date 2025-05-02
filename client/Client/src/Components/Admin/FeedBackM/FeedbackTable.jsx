import { useState, useEffect } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';

const FeedbackTable = ({ onDelete, refreshTrigger }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8045/api/v1/feedback/get-all-FeedBack');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setFeedbacks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching feedback data:', err);
        setError('Failed to load feedback data. Please try again later.');
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [refreshTrigger]);

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

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  const filteredFeedbacks = feedbacks.filter(
    feedback =>
      feedback.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 text-sm font-medium text-gray-800">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-green-800">User Feedback</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or comment"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-green-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-1.5 px-4 rounded-md shadow transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div 
        className="overflow-auto rounded-lg border border-gray-200 shadow-lg custom-scrollbar"
        style={{ maxHeight: '500px' }}
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No matching feedback found
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`bg-gradient-to-r from-green-200 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-900 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-900 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFeedbacks.map((feedback, index) => (
                <tr 
                  key={feedback.feedbackId} 
                  className={`transition-all duration-150 ${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} hover:bg-green-100`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.feedbackId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderStars(feedback.rating)}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{feedback.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onDelete && onDelete(feedback.feedbackId)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded shadow transition-all duration-150 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
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
