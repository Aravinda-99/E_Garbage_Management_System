import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trash2, Recycle, Leaf, Factory, Truck, Scale, Pizza, ShoppingBag } from 'lucide-react';

const stats = [
  {
    icon: Trash2,
    value: '500K+',
    label: 'Tons Collected',
    description: 'Total waste collected and processed annually'
  },
  {
    icon: Recycle,
    value: '75%',
    label: 'Recycling Rate',
    description: 'Of collected waste successfully recycled'
  },
  {
    icon: Pizza,
    value: '100K+',
    label: 'Food Waste',
    description: 'Tons of food waste converted to compost'
  },
  {
    icon: ShoppingBag,
    value: '250K+',
    label: 'Plastic Recycled',
    description: 'Tons of plastic prevented from landfills'
  },
  {
    icon: Factory,
    value: '15+',
    label: 'Facilities',
    description: 'State-of-the-art processing centers'
  },
  {
    icon: Truck,
    value: '100+',
    label: 'Vehicles',
    description: 'Eco-friendly collection fleet'
  }
];

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">Our Impact</h2>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Making a measurable difference in waste management and environmental conservation
          </p>
        </div>
        
        {/* Adjusted grid to 3 columns and centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300 transform hover:-translate-y-1"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <motion.span
                className="block text-4xl font-bold text-emerald-900 mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">{stat.label}</h3>
              <p className="text-emerald-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};