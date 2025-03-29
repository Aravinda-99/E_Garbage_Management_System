// src/components/FeedbackList.jsx
import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Feedback</h2>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-700">{feedback.author}</h3>
              <div className="text-yellow-500">
                {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{feedback.message}</p>
            <p className="text-sm text-gray-400 mt-3">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;