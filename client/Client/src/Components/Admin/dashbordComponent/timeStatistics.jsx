import React from 'react';
import { Calendar, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const TimeStatistics = ({ stats }) => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Collection Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Scheduled</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.scheduled}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Active Locations</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.locations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">On-time Rate</p>
            <span className="text-lg font-semibold text-green-600">92%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Issues Reported</p>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-lg font-semibold text-yellow-600">5</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">2 missed collections, 3 delays</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Avg. Collection Time</p>
            <span className="text-lg font-semibold text-blue-600">2.4h</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">Last week: 2.7h</div>
        </div>
      </div>
    </div>
  );
};

export default TimeStatistics;