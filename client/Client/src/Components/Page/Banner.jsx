import React from 'react';
import { Phone } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Banner = () => {
  return (
    <div>
      <section className="py-20 bg-gray-100 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Assistance? Get in Touch!
          </h2>
          <p className="text-gray-700 mb-6">
            Our team is here to help you with any inquiries about our platform and services.
          </p>
          <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
            aria-label="Call us now"
          >
            <Phone className="w-5 h-5" /> 
            Call Us Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Banner;