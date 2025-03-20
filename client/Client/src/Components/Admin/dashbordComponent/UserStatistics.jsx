// UserStatistics.jsx
import React from 'react';
import { Users, Trash } from 'lucide-react';

const UserStatistics = ({ userStats }) => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Total Citizens</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.citizens}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <Trash className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Waste Collectors</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.collectors}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Admin Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.admins}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;