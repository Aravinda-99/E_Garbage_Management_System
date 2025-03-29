import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Trash2, Clock, Users } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div  className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
      <Navbar />
      {/* Hero Section */}
      <div 
        className="5 relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="py-5 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Contact WasteWise
          </h1>
          <p className="text-xl text-green-100">
            We're here to help with all your e-waste management needs. Reach out for recycling solutions, 
            pickup services, or partnership opportunities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Trash2 className="text-green-600 h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  E-Waste Solutions
                </h2>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team is dedicated to providing sustainable e-waste disposal solutions 
                that protect the environment while complying with all regulations.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
                    <MapPin className="text-green-600 h-6 w-6 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200">Our Location</h3>
                    <p className="text-gray-600">123 Green Tech Park, Malabe, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
                    <Phone className="text-green-600 h-6 w-6 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200">Phone Number</h3>
                    <p className="text-gray-600">+94 77 000 3399</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
                    <Mail className="text-green-600 h-6 w-6 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200">Email Address</h3>
                    <p className="text-gray-600">contact@wastewise.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-green-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Quick Support
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-200" />
                  <p className="text-green-100">24/7 Customer Support via WhatsApp</p>
                </div>
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-green-200" />
                  <p className="text-green-100">Same-day pickup for bulk e-waste</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-200" />
                  <p className="text-green-100">Multiple drop-off locations across Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                <h2 className="text-2xl font-semibold">Send us a Message</h2>
                <p className="text-green-100">We'll respond within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {submitSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Thank you for your message! We've received it and will get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="+94 77 123 4567"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      required
                      placeholder="E-waste Pickup Inquiry"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Tell us about your e-waste management needs..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitting 
                      ? 'bg-green-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg hover:shadow-xl'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            {/* <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Our Location in Malabe</h3>
                  <p className="text-gray-500 mt-2">123 Green Tech Park, Malabe, Sri Lanka</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default ContactUs;