import { useState, useEffect } from 'react';

const ComplaintTable = ({ onDelete, onEdit }) => {
  const [scrolled, setScrolled] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle scroll for shadow effect on table header
  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8045/get-all-complains');
        
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        
        const data = await response.json();
        setComplaints(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to load complaints. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Handle delete complaint
  const handleDelete = async (complaintId) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const response = await fetch(`http://localhost:8045/delete-complain/${complaintId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete complaint');
        }
        
        // Remove the deleted complaint from state
        setComplaints(complaints.filter(complaint => complaint.complainID !== complaintId));
        
        // Also call the parent's onDelete if provided
        if (onDelete) onDelete(complaintId);
        
      } catch (err) {
        console.error('Error deleting complaint:', err);
        alert('Failed to delete complaint. Please try again.');
      }
    }
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-md" style={{ maxHeight: '500px' }} onScroll={handleScroll}>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-32 text-red-500">{error}</div>
      ) : complaints.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-gray-500">No complaints found</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`bg-gradient-to-r from-green-100 to-teal-100 sticky top-0 z-10 ${scrolled ? 'shadow-sm' : ''}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Complaint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complaints.map((complaint, index) => (
              <tr key={complaint.complainID} className={`${index % 2 === 0 ? 'bg-green-50' : 'bg-white'} hover:bg-green-100 transition-colors duration-150`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{complaint.complainID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{complaint.complain}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {complaint.image ? (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={complaint.image} 
                          alt="Complaint evidence" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.png"; // Fallback image
                          }}
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No image</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(complaint)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded shadow-sm transition-colors duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.complainID)}
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
      )}
    </div>
  );
};

export default ComplaintTable;