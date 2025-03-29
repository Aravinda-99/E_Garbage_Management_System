import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  Trash2, 
  Leaf, 
  Battery, 
  Pizza, 
  ShoppingBag, 
  Recycle,
  Factory
} from 'lucide-react';

const GalleryItem = ({ title, category, image, icon, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ 
      scale: 1.03,
      transition: { duration: 0.3 }
    }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
  >
    <motion.div 
      className="aspect-[4/3] overflow-hidden"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 }
      }}
    >
      <div 
        className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6 text-white"
        initial={{ y: 20 }}
        whileHover={{ y: 0 }}
      >
        <motion.div 
          className="flex items-center gap-2 text-emerald-400 mb-2"
          whileHover={{ scale: 1.05 }}
        >
          {icon}
          <span className="text-sm uppercase tracking-wider">{category}</span>
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold mb-2"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            transition: { delay: 0.1 }
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  </motion.div>
);

export const Gallery = () => {
  const items = [
    {
      title: "E-Waste Management",
      category: "Electronics",
      description: "Responsible disposal of computers, phones, and electronic equipment",
      image: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80",
      icon: <Laptop className="w-5 h-5" />
    },
    {
      title: "Plastic Recycling",
      category: "Plastics",
      description: "Processing and recycling all types of plastic materials",
      image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80",
      icon: <Recycle className="w-5 h-5" />
    },
    {
      title: "Food Waste Collection",
      category: "Organic",
      description: "Converting food waste into compost and biogas",
      image: "https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&q=80",
      icon: <Pizza className="w-5 h-5" />
    },
    {
      title: "Green Waste",
      category: "Garden",
      description: "Processing yard waste into mulch and compost",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80",
      icon: <Leaf className="w-5 h-5" />
    },
    {
      title: "Commercial Waste",
      category: "Business",
      description: "Comprehensive waste management solutions for businesses",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80",
      icon: <Factory className="w-5 h-5" />
    },
    {
      title: "Packaging Waste",
      category: "Commercial",
      description: "Recycling cardboard, paper, and packaging materials",
      image: "https://img.freepik.com/free-photo/used-plastic-bottles-recycling-bins-earth-day-campaign_53876-104848.jpg?t=st=1743192774~exp=1743196374~hmac=f34039814d5cf85f7c9554dbdfdaf797e672ef1c2ed9fef31fbe1cb7a1adae51&w=1380",
      icon: <ShoppingBag className="w-5 h-5" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      className="py-24 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
          }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-emerald-600 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { delay: 0.2 }
            }}
          >
            Waste Management Solutions
          </motion.span>
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mt-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3 }
            }}
          >
            Comprehensive Recycling Services
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { delay: 0.4 }
            }}
          >
            From electronic waste to organic materials, we provide sustainable solutions for all types of waste management needs.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, index) => (
            <GalleryItem key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};