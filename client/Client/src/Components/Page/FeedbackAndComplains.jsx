import React, { useState } from 'react';
import { Star, StarOff, Upload, Send, Trash2, MessageSquare, AlertTriangle } from 'lucide-react';

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

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Feedback submitted:', { feedbackName, rating, feedbackComment });
    setFeedbackName('');
    setRating(0);
    setFeedbackComment('');
    setIsSubmitting(false);
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Complaint submitted:', { complaintName, complaintText, selectedImage });
    setComplaintName('');
    setComplaintText('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsSubmitting(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-3">
          E-Garbage Management
        </h1>
        <p className="text-center text-green-600 mb-8 sm:mb-12 text-base sm:text-lg">
          Help us improve our service with your valuable feedback
        </p>

        <div className="max-w-full md:max-w-2xl mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="flex p-1 gap-1 bg-gray-50">
            <button
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'feedback'
                  ? 'bg-white text-green-600 shadow-lg shadow-green-100'
                  : 'text-gray-600 hover:bg-white/50 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              Feedback
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'complaint'
                  ? 'bg-white text-green-600 shadow-lg shadow-green-100'
                  : 'text-gray-600 hover:bg-white/50 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('complaint')}
            >
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
              Complaint
            </button>
          </div>

          <div className="p-4 sm:p-8">
            {activeTab === 'feedback' ? (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="bg-white/50 p-4 sm:p-6 rounded-xl">
                  <label className="block text-green-800 text-sm font-medium mb-3 sm:mb-4">
                    How would you rate our service?
                  </label>
                  <div className="flex gap-2 sm:gap-3 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transform hover:scale-110 transition-all duration-200"
                      >
                        {star <= (hoverRating || rating) ? (
                          <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                        ) : (
                          <StarOff className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                    Share your thoughts with us
                  </label>
                  <textarea
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                    rows={4}
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-green-700 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleComplaintSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={complaintName}
                    onChange={(e) => setComplaintName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                    What went wrong?
                  </label>
                  <textarea
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-200 transition-all duration-300 placeholder:text-gray-400"
                    rows={4}
                    placeholder="Describe the issue you encountered..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-green-800 text-sm font-medium mb-2 sm:mb-3">
                    Add supporting image
                  </label>
                  <div className="mt-2">
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-green-200 bg-white/50 rounded-xl p-6 sm:p-8 hover:border-green-400 hover:bg-white/80 transition-all duration-300 cursor-pointer relative group">
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 group-hover:text-green-600 transition-colors duration-300" />
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
                      </div>
                    ) : (
                      <div className="relative group bg-white/50 p-3 sm:p-4 rounded-xl">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-32 sm:max-h-48 rounded-lg mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-green-700 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBackAndComp;