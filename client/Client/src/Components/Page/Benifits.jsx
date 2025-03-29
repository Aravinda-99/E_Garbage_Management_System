import React from 'react';
import { Play, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

const SystemBenefits = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const videoVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gradient-to-b from-green-50 to-white">
      {/* Left Section - Benefits */}
      <motion.div 
        className="bg-emerald-900 text-white p-4 lg:p-6 w-full lg:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-lg mx-auto space-y-4">
          <motion.h2 
            className="text-2xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            Why WasteWise?
          </motion.h2>
          {[
            {
              title: "Efficient Collection",
              desc: "Streamlined waste pickup ensures cleaner streets and timely disposal."
            },
            {
              title: "Smart Monitoring",
              desc: "Real-time bin status updates optimize collection routes and reduce overflow."
            },
            {
              title: "Eco-Friendly",
              desc: "Promoting sustainable waste management for a greener planet."
            },
            {
              title: "Community Impact",
              desc: "Empowering residents to contribute to a cleaner environment."
            },
            {
              title: "Cost Effective",
              desc: "Reducing operational costs with data-driven waste management."
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index} 
              className="flex items-start space-x-3"
              variants={itemVariants}
            >
              <div className="mt-1 flex-shrink-0">
                <Recycle size={20} className="text-green-200" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">{benefit.title}</h3>
                <p className="mt-1 text-green-100 text-xs">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Section - Stats and Video */}
      <motion.div 
        className="w-full lg:w-1/2 p-4 lg:p-6 bg-white flex flex-col justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-lg mx-auto">
          <motion.p 
            className="text-green-600 font-semibold uppercase tracking-wide text-xs"
            variants={itemVariants}
          >
            Our Impact
          </motion.p>
          <motion.h2 
            className="text-2xl lg:text-3xl font-bold mt-1 text-gray-800"
            variants={itemVariants}
          >
            Transforming Waste Management
          </motion.h2>

          <motion.div 
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              { value: "12K+", label: "Bins Monitored" },
              { value: "5M+", label: "Tons Recycled" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
              >
                <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
                <div className="w-20 h-1 bg-green-200 my-1 rounded-full"></div>
                <p className="text-gray-600 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Video Section - Waste Collection */}
        <motion.div 
          className="mt-6 lg:mt-8 relative"
          variants={videoVariants}
        >
          <div className="rounded-xl overflow-hidden shadow-lg relative w-full h-40 lg:h-48">
            <video
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/video/2020/06/13/41869-431407027_large.mp4"
              poster="https://img.mixkit.co/videos/preview/waste-collection-truck-in-the-streets-5088-0-large.jpg"
              controls={false}
            />
            <motion.button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:bg-green-700 transition-all duration-300"
              onClick={() => document.querySelector('video')?.play()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} className="text-white ml-1" />
            </motion.button>
          </div>
          <p className="mt-1 text-xs text-gray-500 text-center">See our waste collection in action</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SystemBenefits;