import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MessageSquarePlus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleAction = (type) => {
    setActiveButton(type);
    setTimeout(() => {
      if (type === 'feedback') {
        navigate('/feedback');
      } else if (type === 'complaint') {
        navigate('/complain');
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[200px]">
      <div className="w-full max-w-3xl">
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl overflow-hidden relative
                    shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)]
                    transition-all duration-300 hover:-translate-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl pointer-events-none 
                          shadow-[inset_0_0_20px_0_rgba(16,185,129,0.15)]"></div>
          
          {/* Header Section */}
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
            <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/10"></div>
            
            <motion.h2 
              className="text-2xl font-bold tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Add Feedback or Complaint
            </motion.h2>
            <motion.p 
              className="text-sm opacity-90 mt-2 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join our mission to create a cleaner, more sustainable future
            </motion.p>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center
                              shadow-[0_0_0_4px_rgba(16,185,129,0.2)]">
                  <MessageSquarePlus className="w-5 h-5 text-emerald-600" />
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800">
                Your Voice Matters
              </h3>
            </div>

            <motion.p 
              className="text-gray-600 text-sm mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We're committed to building smarter solutions through community feedback. 
              Share your ideas or report issues to help us improve services in your area.
            </motion.p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => handleAction('feedback')}
                className={`relative overflow-hidden h-12 rounded-lg flex items-center justify-between px-4
                  ${activeButton === 'feedback' ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} 
                  text-white font-medium group transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={activeButton}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AnimatePresence>
                  {activeButton === 'feedback' && (
                    <motion.div 
                      className="absolute inset-0 bg-emerald-800"
                      initial={{ left: '100%' }}
                      animate={{ left: '0%' }}
                      exit={{ left: '0%' }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-3 relative z-10">
                  <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Share Feedback</span>
                </div>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => handleAction('complaint')}
                className={`relative overflow-hidden h-12 rounded-lg flex items-center justify-between px-4
                  ${activeButton === 'complaint' ? 'bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'} 
                  text-white font-medium group transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={activeButton}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatePresence>
                  {activeButton === 'complaint' && (
                    <motion.div 
                      className="absolute inset-0 bg-amber-800"
                      initial={{ left: '100%' }}
                      animate={{ left: '0%' }}
                      exit={{ left: '0%' }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-3 relative z-10">
                  <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Report Issue</span>
                </div>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;