import React from "react";

const FeedbackInPTable = ({ feedbacks, onEdit, onDelete }) => {
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
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.rating}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{feedback.comment}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(feedback)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium transition duration-150 shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(feedback)}
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
