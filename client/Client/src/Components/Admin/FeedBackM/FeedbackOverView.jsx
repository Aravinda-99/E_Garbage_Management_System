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
import FeedbackTable from '../FeedBackM/FeedbackTable';

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

        {/* Charts Section - Only Response Performance remains */}
        <motion.div 
          className="grid grid-cols-1 gap-5 mb-8"
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

        {/* Feedback Table Section */}
        <motion.div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              <div className="flex space-x-2">
                <motion.button
                  className={`px-3 py-1 text-sm rounded-md ${selectedFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedFilter('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                <motion.button
                  className={`px-3 py-1 text-sm rounded-md ${selectedFilter === 'positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedFilter('positive')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Positive
                </motion.button>
                <motion.button
                  className={`px-3 py-1 text-sm rounded-md ${selectedFilter === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedFilter('negative')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Negative
                </motion.button>
                <motion.button
                  className={`px-3 py-1 text-sm rounded-md ${selectedFilter === 'unread' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSelectedFilter('unread')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Unread
                </motion.button>
              </div>
            </div>
          </div>
          <FeedbackTable filter={selectedFilter} />
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

export default FeedbackDashboard;