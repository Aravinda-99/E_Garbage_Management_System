import React, { useState, useEffect } from 'react';
import FeedbackList from './FeedbackList';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { motion } from 'framer-motion';

function FeedbackDisplay() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint for fetching feedback
  const FEEDBACK_API_URL = 'http://localhost:8045/api/v1/feedback/get-all-FeedBack';

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await fetch(FEEDBACK_API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.status}`);
        }
        
        const data = await response.json();
        setFeedbacks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to load feedback. Please try again later.');
        // Keep some fallback data for development/testing
        setFeedbacks([
          {
            feedbackId: 1,
            username: "Sarah Johnson",
            message: "The service was exceptional! I particularly enjoyed how responsive the team was to my requests.",
            rating: 5,
            date: new Date().toISOString()
          },
          {
            feedbackId: 2,
            username: "Michael Chen",
            message: "Good experience overall, though there's room for improvement in the delivery time.",
            rating: 4,
            date: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">Customer Feedback</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our users have to say about our E-Garbage Management services
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No feedback available yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          >
            {feedbacks.map((feedback) => (
              <motion.div 
                key={feedback.feedbackId} 
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="w-full max-w-md">
                  <FeedbackList 
                    feedbacks={[{
                      id: feedback.feedbackId,
                      author: feedback.username,
                      message: feedback.message,
                      rating: feedback.rating,
                      createdAt: feedback.date || new Date().toISOString()
                    }]} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FeedbackDisplay;