import React from "react";

// Mock data for the feedback table
const mockFeedbacks = [
  {
    feedbackId: 1,
    userName: "John Doe",
    rating: 5,
    comment: "Excellent service! The e-waste collection was prompt and professional."
  },
  {
    feedbackId: 2,
    userName: "Jane Smith",
    rating: 4,
    comment: "Great initiative for the environment. Would love to see more collection centers."
  },
  {
    feedbackId: 3,
    userName: "Robert Johnson",
    rating: 3,
    comment: "Good service but the waiting time was a bit long."
  },
  {
    feedbackId: 4,
    userName: "Emily Davis",
    rating: 5,
    comment: "Very satisfied with the recycling process. Keep up the good work!"
  },
  {
    feedbackId: 5,
    userName: "Michael Wilson",
    rating: 2,
    comment: "The collection team arrived late and didn't take all my items."
  },
  {
    feedbackId: 6,
    userName: "Sarah Brown",
    rating: 4,
    comment: "Convenient drop-off location. Staff was very helpful."
  },
  {
    feedbackId: 7,
    userName: "David Taylor",
    rating: 5,
    comment: "Impressed with your sustainability efforts. Will recommend to others!"
  }
];

const FeedbackInPTable = ({ feedbacks = mockFeedbacks, onEdit, onDelete }) => {
  // Default functions if not provided
  const handleEdit = onEdit || ((feedback) => {
    console.log("Edit feedback:", feedback);
    alert(`Editing feedback ID: ${feedback.feedbackId}`);
  });

  const handleDelete = onDelete || ((feedback) => {
    console.log("Delete feedback:", feedback);
    if (window.confirm(`Delete feedback from ${feedback.userName}?`)) {
      alert(`Deleted feedback ID: ${feedback.feedbackId}`);
    }
  });

  return (
    <div className="overflow-auto rounded-lg border border-gray-300 shadow-lg max-h-[500px]">
      <table className="min-w-full border-collapse">
        {/* Table Head */}
        <thead className="bg-gradient-to-r from-indigo-200 to-blue-200 text-gray-700 sticky top-0 z-10 shadow-md">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Rating</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Comment</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-300">
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <tr
                key={feedback.feedbackId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition-colors duration-150`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.feedbackId}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{feedback.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < feedback.rating ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2">({feedback.rating})</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.comment}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium transition duration-150 shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium transition duration-150 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                No feedback available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackInPTable;