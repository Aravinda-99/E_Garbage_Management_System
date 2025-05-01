import React, { useState, useEffect } from 'react';
import FeedbackList from './FeedbackList';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import { motion } from 'framer-motion';

function FeedbackDisplay() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({
    feedbackId: null,
    username: '',
    message: '',
    rating: 5
  });

  // API endpoints
  const FEEDBACK_API_URL = 'http://localhost:8045/api/v1/feedback/get-all-FeedBack';
  const DELETE_FEEDBACK_URL = 'http://localhost:8045/api/v1/feedback/delete-feedBack/';
  const UPDATE_FEEDBACK_URL = 'http://localhost:8045/api/v1/feedback/update/';

  useEffect(() => {
    fetchFeedback();
  }, []);

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

  // Handle edit feedback
  const handleEdit = (id) => {
    // Find the feedback to edit
    const feedbackToEdit = feedbacks.find(feedback => feedback.feedbackId === id);
    if (feedbackToEdit) {
      setCurrentFeedback({
        feedbackId: feedbackToEdit.feedbackId,
        username: feedbackToEdit.username,
        message: feedbackToEdit.message,
        rating: feedbackToEdit.rating
      });
      setEditMode(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFeedback({
      ...currentFeedback,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${UPDATE_FEEDBACK_URL}${currentFeedback.feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentFeedback),
      });

      if (!response.ok) {
        throw new Error(`Failed to update feedback: ${response.status}`);
      }

      const updatedFeedback = await response.json();
      
      // Update the feedbacks array with the edited feedback
      setFeedbacks(feedbacks.map(feedback => 
        feedback.feedbackId === updatedFeedback.feedbackId ? updatedFeedback : feedback
      ));
      
      // Reset form and exit edit mode
      setEditMode(false);
      setCurrentFeedback({
        feedbackId: null,
        username: '',
        message: '',
        rating: 5
      });
      
      alert("Feedback updated successfully");
    } catch (err) {
      console.error('Error updating feedback:', err);
      alert(`Failed to update feedback: ${err.message}`);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditMode(false);
    setCurrentFeedback({
      feedbackId: null,
      username: '',
      message: '',
      rating: 5
    });
  };

  // Handle delete feedback
  const handleDelete = async (id) => {
    try {
      // Show confirmation dialog
      if (!window.confirm("Are you sure you want to delete this feedback?")) {
        return;
      }

      // Call delete API
      const response = await fetch(`${DELETE_FEEDBACK_URL}${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete feedback: ${response.status}`);
      }

      // Update UI by removing the deleted feedback
      setFeedbacks(feedbacks.filter(feedback => feedback.feedbackId !== id));
      
      // Show success message
      alert("Feedback deleted successfully");
    } catch (err) {
      console.error('Error deleting feedback:', err);
      alert(`Failed to delete feedback: ${err.message}`);
    }
  };

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
        
        {/* Edit Feedback Form */}
        {editMode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Edit Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={currentFeedback.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Feedback Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={currentFeedback.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
                  Rating (1-5)
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={currentFeedback.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Feedback
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
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
                <div className="w-full max-w-md relative">
                  <FeedbackList 
                    feedbacks={[{
                      id: feedback.feedbackId,
                      author: feedback.username,
                      message: feedback.message,
                      rating: feedback.rating,
                      createdAt: feedback.date || new Date().toISOString()
                    }]} 
                  />
                  {/* Add edit and delete buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => handleEdit(feedback.feedbackId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(feedback.feedbackId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
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