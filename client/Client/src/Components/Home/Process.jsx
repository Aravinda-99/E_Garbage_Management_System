import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PackageCheck, Truck, Factory, Leaf, Recycle, ScanLine, Scale, Sprout } from 'lucide-react';

const steps = [
  {
    icon: PackageCheck,
    title: 'Schedule Pickup',
    description: 'Book a convenient time for waste collection from your location'
  },
  {
    icon: Truck,
    title: 'Collection',
    description: 'Our eco-friendly vehicles collect all types of waste'
  },
  {
    icon: ScanLine,
    title: 'Sorting',
    description: 'Waste is carefully sorted into different categories'
  },
  {
    icon: Scale,
    title: 'Processing',
    description: 'Each type of waste is processed using appropriate methods'
  },
  {
    icon: Factory,
    title: 'Treatment',
    description: 'Materials undergo specialized treatment processes'
  },
  {
    icon: Recycle,
    title: 'Recycling',
    description: 'Recyclable materials are converted into new products'
  },
  {
    icon: Sprout,
    title: 'Composting',
    description: 'Organic waste is transformed into nutrient-rich compost'
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'Contributing to a cleaner, sustainable environment'
  }
];

export const Process = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-emerald-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-3">How It Works</h2>
          <p className="text-base text-emerald-700">Our comprehensive waste management process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <step.icon className="w-10 h-10 text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">{step.title}</h3>
                <p className="text-sm text-emerald-700">{step.description}</p>
              </div>
              {index < steps.length - 1 && index % 4 !== 3 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-emerald-200 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};