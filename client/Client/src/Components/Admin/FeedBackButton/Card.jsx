import React, { useState } from 'react';
import { Leaf, AlertTriangle, MessageSquarePlus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleAction = (type) => {
    setActiveButton(type);
    setTimeout(() => {
      window.location.href = `/${type}`;
    }, 800);
  };

  // Floating leaf particles component
  const FloatingLeaves = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-400/20"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.3 + 0.3,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0, 0.3, 0],
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}%`
          }}
        >
          <Leaf className="w-4 h-4" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <motion.div 
          className="relative bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.005 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <FloatingLeaves />

          {/* Header Section */}
          <motion.div 
            className="relative h-60 overflow-hidden"
            animate={{
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=2400"
              alt="Sustainable Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-emerald-900/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 text-white">
              <motion.h2 
                className="text-4xl font-bold tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Add FeedBack or Complain
              </motion.h2>
              <motion.p 
                className="text-lg opacity-90 mt-2 font-light max-w-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Join our mission to create a cleaner, more sustainable future
              </motion.p>
            </div>

            <motion.div 
              className="absolute top-6 right-6"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Leaf className="w-10 h-10 text-white/20" />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ 
                  rotate: 360,
                  y: [0, -3, 0]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Leaf className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Your Voice Matters
              </h3>
            </div>

            <motion.p 
              className="text-gray-600 text-base mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We're committed to building smarter waste solutions through community feedback. 
              Share your ideas or report issues to help us improve services in your area.
            </motion.p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                onClick={() => handleAction('feedback')}
                className={`relative overflow-hidden h-14 rounded-lg flex items-center justify-between px-6
                  ${activeButton === 'feedback' ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-medium`}
                whileHover={activeButton ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={activeButton}
              >
                <AnimatePresence>
                  {activeButton === 'feedback' && (
                    <motion.div 
                      className="absolute inset-0 bg-emerald-800"
                      initial={{ left: '100%' }}
                      animate={{ left: '0%' }}
                      exit={{ left: '0%' }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-3 relative z-10">
                  <MessageSquarePlus className="w-5 h-5" />
                  <span>Share Feedback</span>
                </div>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.button>

              <motion.button
                onClick={() => handleAction('complaint')}
                className={`relative overflow-hidden h-14 rounded-lg flex items-center justify-between px-6
                  ${activeButton === 'complaint' ? 'bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'} text-white font-medium`}
                whileHover={activeButton ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={activeButton}
              >
                <AnimatePresence>
                  {activeButton === 'complaint' && (
                    <motion.div 
                      className="absolute inset-0 bg-amber-800"
                      initial={{ left: '100%' }}
                      animate={{ left: '0%' }}
                      exit={{ left: '0%' }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-3 relative z-10">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Report Issue</span>
                </div>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;