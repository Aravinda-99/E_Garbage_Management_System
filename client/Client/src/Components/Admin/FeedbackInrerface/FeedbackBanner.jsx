import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackBanner = () => {
  const navigate = useNavigate();

  const handleViewFeedback = () => {
    navigate('/viewFeed');
  };

  return (
    <div>
      <section className="py-20 bg-gray-100 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            View Feedbacks
          </h2>
          <p className="text-gray-700 mb-6">
            Our team is here to help you with any inquiries about our platform and services.
          </p>
          <button 
            onClick={handleViewFeedback}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
            aria-label="Take a look at feedbacks"
          >
            Take a Look
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeedbackBanner;