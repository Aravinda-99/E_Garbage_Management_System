import React from 'react';
import { FaStar, FaRegStar, FaQuoteLeft } from 'react-icons/fa';

const FeedbackList = ({ feedbacks }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating ? 
        <FaStar key={i} className="text-yellow-400 inline-block text-sm" /> : 
        <FaRegStar key={i} className="text-yellow-400 inline-block text-sm" />
    ));
  };

  return (
    <>
      {feedbacks.map((feedback) => (
        <div 
          key={feedback.id}
          className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-l-2 border-blue-400 p-5"
        >
          <div className="flex items-start mb-3">
            <FaQuoteLeft className="text-blue-100 text-xl mr-2 mt-1 flex-shrink-0" />
            <p className="text-gray-600 text-sm italic">"{feedback.message}"</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{feedback.author}</h3>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 text-gray-600 text-xs">{feedback.rating}.0</span>
              <div className="flex">
                {renderStars(feedback.rating)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedbackList;