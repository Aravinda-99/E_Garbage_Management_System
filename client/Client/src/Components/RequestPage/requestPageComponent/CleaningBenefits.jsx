import React from 'react';
import { motion } from 'framer-motion';

const CleaningBenefits = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2, // Stagger child animations
      },
    },
  };

  // Animation variants for each benefit item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="flex flex-col w-full bg-gray-200">
      {/* Main Content Section */}
      <motion.div
        className="p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the component is in view
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className="text-center mb-8 max-w-md mx-auto">
          <p className="text-gray-600 font-medium">Why Choose Our Service</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            Professional cleaning and waste management solutions.
          </h2>
        </div>

        {/* Benefits List - Two Columns */}
        <div className="flex flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8 w-1/2">
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Scheduled Pickup Service</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Reliable waste collection on a schedule that works for you. We ensure timely pickups with no missed
                  collections.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Specialized Waste Handling</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Safe collection and disposal of specialized waste materials including electronic waste, hazardous
                  materials, and construction debris.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 w-1/2">
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Custom Service Plans</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Flexible service options tailored to your specific needs, whether you're a homeowner, property
                  manager, or business owner.
                </p>
              </div>
            </motion.div>

            {/* Removed duplicate "Custom Service Plans" and added a new benefit */}
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Eco-Friendly Practices</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Sustainable waste management solutions that prioritize recycling and reducing environmental impact.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8 w-1/2">
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Custom Service Plans</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Flexible service options tailored to your specific needs, whether you're a homeowner, property
                  manager, or business owner.
                </p>
              </div>
            </motion.div>

            {/* Removed duplicate "Custom Service Plans" and added a new benefit */}
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900">Eco-Friendly Practices</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Sustainable waste management solutions that prioritize recycling and reducing environmental impact.
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </motion.div>

      
    </div>
  );
};

export default CleaningBenefits;