import React from 'react';

function FeedbackList({ feedbacks }) {
  return (
    <div className="w-full max-w-2xl space-y-6">
      {feedbacks.map((feedback) => (
        <div 
          key={feedback.id} 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {feedback.author}
            </h3>
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">{'★'.repeat(feedback.rating)}</span>
              <span className="text-gray-300">{'★'.repeat(5 - feedback.rating)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{feedback.message}</p>
          
          <div className="text-sm text-gray-500">
            {new Date(feedback.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;