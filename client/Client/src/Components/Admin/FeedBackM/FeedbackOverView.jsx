import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Users, 
  BarChart2,
  Clock,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  Clock as ClockIcon,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function FeedbackDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </motion.div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Feedback Dashboard</h1>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <motion.input
                  type="text"
                  placeholder="Search feedback..."
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5 text-gray-500" />
              </motion.button>
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">A</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feedback Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Monitor and analyze customer feedback</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <motion.select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </motion.select>
            <motion.button 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.03, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
              whileTap={{ scale: 0.98 }}
            >
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[
            {
              title: "Total Feedback",
              value: "1,284",
              change: "+12.5%",
              isIncrease: true,
              icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
              bgColor: "bg-blue-50",
              delay: 0.3
            },
            {
              title: "Avg. Rating",
              value: "4.7",
              change: "+0.3",
              isIncrease: true,
              icon: <Star className="h-5 w-5 text-yellow-500" />,
              bgColor: "bg-yellow-50",
              delay: 0.4
            },
            {
              title: "Response Rate",
              value: "95%",
              change: "+5%",
              isIncrease: true,
              icon: <TrendingUp className="h-5 w-5 text-green-600" />,
              bgColor: "bg-green-50",
              delay: 0.5
            },
            {
              title: "Active Users",
              value: "3,125",
              change: "+258",
              isIncrease: true,
              icon: <Users className="h-5 w-5 text-purple-600" />,
              bgColor: "bg-purple-50",
              delay: 0.6
            }
          ].map((stat, index) => (
            <StatCard key={index} {...stat} isLoading={isLoading} />
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Feedback Volume</h2>
              <div className="flex items-center space-x-2">
                <motion.span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, duration: 2 }
                  }}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </motion.span>
                <MoreHorizontal className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <motion.div 
                className="text-center"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  transition: { repeat: Infinity, duration: 3 }
                }}
              >
                <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Feedback trend visualization</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Response Performance</h2>
              <motion.button 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
            <div className="space-y-3">
              {[
                {
                  category: "Critical Issues",
                  avgTime: "2.5 hours",
                  target: "3 hours",
                  isWithinTarget: true,
                  progress: 85
                },
                {
                  category: "General Feedback",
                  avgTime: "12 hours",
                  target: "24 hours",
                  isWithinTarget: true,
                  progress: 50
                },
                {
                  category: "Feature Requests",
                  avgTime: "36 hours",
                  target: "48 hours",
                  isWithinTarget: true,
                  progress: 75
                }
              ].map((item, index) => (
                <ResponseTimeItem key={index} {...item} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Feedback */}
        <motion.div 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-3 sm:mb-0">
              <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              <p className="text-sm text-gray-500 mt-1">Latest customer feedback items</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', value: 'all', class: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
                { label: 'Positive', value: 'positive', class: 'bg-green-100 text-green-800 hover:bg-green-200' },
                { label: 'Negative', value: 'negative', class: 'bg-red-100 text-red-800 hover:bg-red-200' },
                { label: 'Pending', value: 'pending', class: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' }
              ].map((filter) => (
                <motion.button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                    filter.class
                  } ${
                    selectedFilter === filter.value ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {feedbackItems.map((item, index) => (
                <FeedbackItem key={index} {...item} index={index} />
              ))}
            </AnimatePresence>
          </div>
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>Showing 4 of 1,284 feedback items</span>
            <div className="flex space-x-4">
              <motion.button 
                className="hover:text-gray-700 disabled:opacity-50" 
                disabled
                whileHover={{ x: -2 }}
              >
                Previous
              </motion.button>
              <motion.button 
                className="text-blue-600 hover:text-blue-800 font-medium"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, isIncrease, icon, bgColor, delay = 0, isLoading }) {
  return (
    <motion.div 
      className={`${bgColor} rounded-lg border border-gray-200 p-5`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <motion.div 
              className="mt-1 h-8 w-20 bg-gray-200 rounded animate-pulse"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            />
          ) : (
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          )}
        </div>
        <motion.div 
          className={`p-2 rounded-lg ${bgColor.replace('50', '100')}`}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          {icon}
        </motion.div>
      </div>
      <div className="mt-3 flex items-center">
        {isIncrease ? (
          <ThumbsUp className="h-4 w-4 text-green-500" />
        ) : (
          <ThumbsDown className="h-4 w-4 text-red-500" />
        )}
        {isLoading ? (
          <motion.div 
            className="ml-1 h-4 w-12 bg-gray-200 rounded animate-pulse"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          />
        ) : (
          <span className={`ml-1 text-sm font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
        <span className="ml-2 text-xs text-gray-500">vs last period</span>
      </div>
    </motion.div>
  );
}

function ResponseTimeItem({ category, avgTime, target, isWithinTarget, progress, delay = 0 }) {
  return (
    <motion.div 
      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <motion.div whileHover={{ rotate: 180 }}>
            <Clock className="h-5 w-5 text-gray-400 mr-3" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-900">{category}</p>
            <p className="text-xs text-gray-500">Target: {target}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900 mr-2">{avgTime}</span>
          <motion.div whileHover={{ scale: 1.2 }}>
            {isWithinTarget ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </motion.div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <motion.div 
          className={`h-1.5 rounded-full ${isWithinTarget ? 'bg-green-500' : 'bg-red-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function FeedbackItem({ user, time, message, status, rating, index }) {
  const statusColors = {
    positive: { bg: 'bg-green-100', text: 'text-green-800' },
    negative: { bg: 'bg-red-100', text: 'text-red-800' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
  };

  return (
    <motion.div 
      className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      exit={{ opacity: 0, x: -10 }}
      whileHover={{ x: 5 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start">
          <motion.div 
            className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-sm font-medium text-blue-600">{user.charAt(0)}</span>
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user}</p>
            <div className="flex items-center mt-1">
              <ClockIcon className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.span 
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status].bg} ${statusColors[status].text}`}
            whileHover={{ scale: 1.05 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.span>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
          </motion.div>
        </div>
      </div>
      <motion.p 
        className="text-sm text-gray-600 pl-13"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + index * 0.05 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

// Sample data
const feedbackItems = [
  {
    user: 'John Smith',
    time: '2 hours ago',
    message: 'The new interface is much more intuitive and user-friendly. Great job on the update!',
    status: 'positive',
    rating: 5
  },
  {
    user: 'Sarah Johnson',
    time: '4 hours ago',
    message: 'Having issues with the export functionality. The CSV files are not formatting correctly.',
    status: 'negative',
    rating: 2
  },
  {
    user: 'Michael Wilson',
    time: '5 hours ago',
    message: 'Would love to see dark mode implementation in the next update. The current bright interface strains my eyes during night work.',
    status: 'pending',
    rating: 4
  },
  {
    user: 'Emily Brown',
    time: '1 day ago',
    message: 'The new search feature has greatly improved my workflow efficiency. Finding documents is now 3x faster!',
    status: 'positive',
    rating: 5
  }
];

export default FeedbackDashboard;