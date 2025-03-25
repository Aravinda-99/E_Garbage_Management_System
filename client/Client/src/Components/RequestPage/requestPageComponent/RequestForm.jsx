import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Calendar, Clock, MapPin, Phone, Mail, User, Check, ChevronDown } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8045/api/v1/request"; // Replace with your backend URL

const RequestForm = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    requesterName: '',
    email: '',
    contactNumbers: '',
    eventType: '',
    location: '',
    eventDate: '',
    eventTime: '',
    numberOfCleaners: 1, // Default to 1 to match backend requirement
    estimatedDuration: '',
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;

    if (!formData.requesterName.trim()) newErrors.requesterName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.contactNumbers.trim()) newErrors.contactNumbers = 'Contact number is required';
    else if (!phoneRegex.test(formData.contactNumbers)) newErrors.contactNumbers = 'Please enter a valid phone number';
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.eventTime) newErrors.eventTime = 'Event time is required';
    if (!formData.numberOfCleaners) newErrors.numberOfCleaners = 'Number of cleaners is required';
    if (isNaN(formData.numberOfCleaners)) newErrors.numberOfCleaners = 'Number of cleaners must be a number';
    if (formData.numberOfCleaners < 1) newErrors.numberOfCleaners = 'Number of cleaners must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numberOfCleaners to a number for backend compatibility
    const processedValue = name === 'numberOfCleaners' ? parseInt(value, 10) || 1 : value;
    
    setFormData({ ...formData, [name]: processedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Ensure numberOfCleaners is a number and at least 1
        const finalFormData = {
          ...formData,
          numberOfCleaners: Math.max(1, parseInt(formData.numberOfCleaners, 10) || 1),
        };

        // Call the API to save the request
        const response = await axios.post(`${API_BASE_URL}/save`, finalFormData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle the response message
        const responseMessage = response.data;
        setSubmitSuccess(true);
        setTimeout(() => {
          setFormData({
            requesterName: '',
            email: '',
            contactNumbers: '',
            eventType: '',
            location: '',
            eventDate: '',
            eventTime: '',
            numberOfCleaners: 1, // Reset to default
            estimatedDuration: '',
          });
          setSubmitSuccess(false);
        }, 2000);
      } catch (error) {
        // Handle errors
        if (error.response) {
          // Server responded with an error
          setErrors({ submit: error.response.data || 'Failed to submit request. Please try again.' });
        } else if (error.request) {
          // No response received
          setErrors({ submit: 'No response from the server. Please try again.' });
        } else {
          // Error in setting up the request
          setErrors({ submit: error.message || 'Failed to submit request. Please try again.' });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation classes based on visibility
  const formAnimationClass = isVisible
    ? 'opacity-100 scale-100'
    : 'opacity-0 scale-95';

  // Different animation for fields based on their position
  const getFieldAnimationClass = (index) => {
    if (!isVisible) return 'opacity-0 translate-x-8';
    return `opacity-100 translate-x-0 transition-all duration-700 delay-${index * 100}`;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`max-w-6xl bg-white p-6 rounded-2xl shadow-lg relative flex flex-col gap-3 transition-all duration-1000 ${formAnimationClass}`}
    >
      {submitSuccess && (
        <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center z-10 animate-fade-in">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xl font-medium text-green-600">Request Submitted Successfully!</p>
          </div>
        </div>
      )}

      {/* Centered Heading and Subheading with reveal animation */}
      <div className={`text-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative inline-block">
          <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mx-auto">
            <span className="absolute w-6 h-6 rounded-full bg-blue-400 animate-ping opacity-75"></span>
          </span>
        </div>
        <h2 className={`text-2xl text-blue-600 font-bold mt-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Cleaning Request
        </h2>
        <p className={`text-sm text-gray-600 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Complete the form below to submit a new cleaning request
        </p>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="flex gap-4">
        <div className={`w-1/2 flex flex-col gap-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="col-span-2">
            <label className="relative block">
              <div className="text-xs font-medium text-gray-700 mb-1">Requester Name</div>
              <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4 mr-1" />
              </div>
              <input
                type="text"
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.requesterName ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                placeholder="Full Name"
              />
            </label>
            {errors.requesterName && <p className="text-xs text-red-500 mt-1">{errors.requesterName}</p>}
          </div>

          <div className="col-span-2">
            <label className="relative block">
              <div className="text-xs font-medium text-gray-700 mb-1">Email</div>
              <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-4 h-4 mr-1" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                placeholder="Email Address"
              />
            </label>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="relative block">
              <div className="text-xs font-medium text-gray-700 mb-1">Contact Number</div>
              <div className="relative">
                <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-4 h-4 mr-1" />
                </div>
                <input
                  type="text"
                  name="contactNumbers"
                  value={formData.contactNumbers}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.contactNumbers ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                  placeholder="Contact Number"
                />
              </div>
            </label>
            {errors.contactNumbers && <p className="text-xs text-red-500 mt-1">{errors.contactNumbers}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Event Type</label>
            <div className="relative">
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 outline-none border ${errors.eventType ? 'border-red-400' : 'border-gray-300'} rounded-lg appearance-none bg-white pr-10 transition-all duration-300`}
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate Event</option>
                <option value="House Party">House Party</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.eventType && <p className="text-xs text-red-500 mt-1">{errors.eventType}</p>}
          </div>
        </div>

        <div className={`w-1/2 flex flex-col gap-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div>
            <label className="relative block">
              <div className="text-xs font-medium text-gray-700 mb-1">Location</div>
              <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.location ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                placeholder="Event Location"
              />
            </label>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <label className="relative block">
                <div className="text-xs font-medium text-gray-700 mb-1">Event Date</div>
                <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                </div>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  min={today}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.eventDate ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                />
              </label>
              {errors.eventDate && <p className="text-xs text-red-500 mt-1">{errors.eventDate}</p>}
            </div>

            <div className="col-span-1">
              <label className="relative block">
                <div className="text-xs font-medium text-gray-700 mb-1">Event Time</div>
                <div className="flex items-center absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                </div>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 outline-none border ${errors.eventTime ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
                  placeholder="Enter Event Time"
                />
              </label>
              {errors.eventTime && <p className="text-xs text-red-500 mt-1">{errors.eventTime}</p>}
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Number of Cleaners</label>
            <input
              type="number"
              name="numberOfCleaners"
              value={formData.numberOfCleaners}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2.5 outline-none border ${errors.numberOfCleaners ? 'border-red-400' : 'border-gray-300'} rounded-lg transition-all duration-300`}
              placeholder="Number of Cleaners (minimum 1)"
            />
            {errors.numberOfCleaners && <p className="text-xs text-red-500 mt-1">{errors.numberOfCleaners}</p>}
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Duration (hours)</label>
            <input
              type="number"
              name="estimatedDuration"
              min="1"
              max="24"
              step="0.5"
              value={formData.estimatedDuration}
              onChange={handleChange}
              className="w-full px-3 py-2.5 outline-none border border-gray-300 rounded-lg transition-all duration-300"
              placeholder="e.g. 3.5"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-500 mt-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } delay-500`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>

      <p className={`text-center text-sm text-gray-600 mt-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } delay-600`}>
        View your existing requests{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium">
          here
        </a>
      </p>
    </form>
  );
};

export default RequestForm;