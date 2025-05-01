import React, { useState, useEffect } from 'react';
import { Star, StarOff, Upload, Send, Trash2, MessageSquare, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';

function FeedBackAndComp() {
  const [activeTab, setActiveTab] = useState('feedback');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [complaintName, setComplaintName] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Updated API Base URL to match your Spring controller endpoint
  const FEEDBACK_API_URL = 'http://localhost:8045/api/v1/feedback';
  // Keep original API for complaints
  const API_BASE_URL = 'http://localhost:8045';

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Validation function to allow only letters
  const allowOnlyLetters = (value) => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotification = (message, isSuccess = true) => {
    setSubmitMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Updated payload to match FeedBackDTO fields expected by backend
    const payload = {
      username: feedbackName,      // Match DTO field name
      message: feedbackComment,    // Match DTO field name
      rating: rating
    };
  
    try {
      const response = await fetch(`${FEEDBACK_API_URL}/saved`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const message = await response.text();
        showNotification(`Feedback submitted: ${message}`, true);
        setFeedbackName('');
        setRating(0);
        setFeedbackComment('');
      } else {
        showNotification('Failed to submit feedback.', false);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showNotification('Something went wrong.', false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For image upload, we'll need to use FormData
      if (selectedImage) {
        // Convert image to base64 for backend storage
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = async () => {
          const base64Image = reader.result;
          
          // Match backend field names: name, complain, image
          const payload = {
            name: complaintName,
            complain: complaintText,
            image: base64Image
          };
          
          const response = await fetch(`${API_BASE_URL}/saved`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          
          if (response.ok) {
            const message = await response.text();
            showNotification(`Complaint submitted: ${message}`, true);
            // Reset form
            setComplaintName('');
            setComplaintText('');
            setSelectedImage(null);
            setImagePreview(null);
          } else {
            showNotification('Failed to submit complaint with image.', false);
          }
          setIsSubmitting(false);
        };
      } else {
        // If no image, just send JSON with matching field names
        const payload = {
          name: complaintName,
          complain: complaintText,
          image: null
        };
        
        const response = await fetch(`${API_BASE_URL}/saved`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        if (response.ok) {
          const message = await response.text();
          showNotification(`Complaint submitted: ${message}`, true);
          // Reset form
          setComplaintName('');
          setComplaintText('');
          setSelectedImage(null);
          setImagePreview(null);
        } else {
          showNotification('Failed to submit complaint.', false);
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      showNotification('Something went wrong.', false);
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const starVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: [0, 10, -10, 0] },
    tap: { scale: 0.9 }
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0px 5px 15px rgba(5, 150, 105, 0.3)" },
    tap: { scale: 0.98 }
  };

  const tabContentVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 }
  };

  const imageUploadVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20"
      >
        <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-3">
              E-Garbage Management
            </h1>
            <p className="text-center text-green-600 mb-8 sm:mb-12 text-base sm:text-lg">
              Help us improve our service with your valuable feedback
            </p>
          </motion.div>

          {/* Notification Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg"
              >
                {submitMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-full md:max-w-2xl mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-white/20"
          >
            <div className="flex p-1 gap-1 bg-gray-50">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeTab === 'feedback'
                    ? 'bg-white text-green-600 shadow-lg shadow-green-100'
                    : 'text-gray-600 hover:bg-white/50 hover:text-green-600'
                }`}
                onClick={() => setActiveTab('feedback')}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Feedback
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeTab === 'complaint'
                    ? 'bg-white text-green-600 shadow-lg shadow-green-100'
                    : 'text-gray-600 hover:bg-white/50 hover:text-green-600'
                }`}
                onClick={() => setActiveTab('complaint')}
              >
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                Complaint
              </motion.button>
            </div>

            <div className="p-4 sm:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'feedback' ? (
                  <motion.form
                    key="feedback"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={handleFeedbackSubmit}
                    className="space-y-6 sm:space-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(allowOnlyLetters(e.target.value))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                        placeholder="Enter your name"
                        pattern="[A-Za-z\s]+"
                        title="Only letters are allowed"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/50 p-4 sm:p-6 rounded-xl"
                    >
                      <label className="block text-green-800 text-sm font-medium mb-3 sm:mb-4">
                        How would you rate our service?
                      </label>
                      <div className="flex gap-2 sm:gap-3 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            variants={starVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            {star <= (hoverRating || rating) ? (
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.3 }}
                              >
                                <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                              </motion.div>
                            ) : (
                              <StarOff className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                        Share your thoughts with us
                      </label>
                      <textarea
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(allowOnlyLetters(e.target.value))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                        rows={4}
                        placeholder="Tell us about your experience..."
                        pattern="[A-Za-z\s]+"
                        title="Only letters are allowed"
                        required
                      />
                    </motion.div>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="complaint"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={handleComplaintSubmit}
                    className="space-y-6 sm:space-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={complaintName}
                        onChange={(e) => setComplaintName(allowOnlyLetters(e.target.value))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                        placeholder="Enter your name"
                        pattern="[A-Za-z\s]+"
                        title="Only letters are allowed"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                        What went wrong?
                      </label>
                      <textarea
                        value={complaintText}
                        onChange={(e) => setComplaintText(allowOnlyLetters(e.target.value))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                        rows={4}
                        placeholder="Describe the issue you encountered..."
                        pattern="[A-Za-z\s]+"
                        title="Only letters are allowed"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                        Add supporting image
                      </label>
                      <div className="mt-2">
                        <AnimatePresence mode="wait">
                          {!imagePreview ? (
                            <motion.div
                              key="upload-area"
                              variants={imageUploadVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className="border-2 border-dashed border-green-200 bg-white/50 rounded-xl p-6 sm:p-8 hover:border-green-400 hover:bg-white/80 transition-all duration-300 cursor-pointer relative group"
                            >
                              <div className="flex flex-col items-center">
                                <motion.div
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                >
                                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 group-hover:text-green-600 transition-colors duration-300" />
                                </motion.div>
                                <p className="mt-2 sm:mt-3 text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                                  Drop your image here or click to browse
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="image-preview"
                              variants={imageUploadVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="relative group bg-white/50 p-3 sm:p-4 rounded-xl"
                            >
                              <motion.img
                                src={imagePreview}
                                alt="Preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="max-h-32 sm:max-h-48 rounded-lg mx-auto"
                              />
                              <motion.button
                                type="button"
                                onClick={removeImage}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute -top-2 -right-2 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default FeedBackAndComp;