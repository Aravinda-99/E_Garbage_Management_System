import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BarChart2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ComplaintTable from './ComplainTable';

const ComplainOverView = () => {
  const complaintData = [
    {
      icon: AlertCircle,
      color: 'red',
      title: 'Open Complaints',
      count: 12
    },
    {
      icon: Clock,
      color: 'yellow',
      title: 'In Progress',
      count: 5
    },
    {
      icon: CheckCircle2,
      color: 'green',
      title: 'Resolved',
      count: 28
    },
    {
      icon: BarChart2,
      color: 'blue',
      title: 'Total Complaints',
      count: 45
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Complaint Management Dashboard
        </h1>

        {/* Animated Grid Layout */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {complaintData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center">
                  <IconComponent 
                    className={`text-${item.color}-500 mr-4`} 
                    size={40} 
                  />
                  <div>
                    <p className="text-gray-500 text-sm">{item.title}</p>
                    <p className={`text-2xl font-bold text-${item.color}-600`}>
                      {item.count}
                    </p>
                  </div>
                </div>
                <motion.div className="text-gray-400 text-sm" whileHover={{ scale: 1.1 }}>
                  View Details
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Complaint Table with Extra Spacing */}
        <div className="mt-10">
          <ComplaintTable />
        </div>
      </div>
    </div>
  );
};

export default ComplainOverView;