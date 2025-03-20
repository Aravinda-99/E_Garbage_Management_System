import React from 'react';
import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsAnalytics = ({ analyticsData, downloadReport }) => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Reports & Analytics</h3>
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={downloadReport}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="collections" stroke="#3B82F6" activeDot={{ r: 8 }} name="Collections" />
                <Line type="monotone" dataKey="missedPickups" stroke="#EF4444" name="Missed Pickups" />
                <Line type="monotone" dataKey="engagement" stroke="#10B981" name="User Engagement" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">Key Insights</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Collection efficiency has improved by 12% over the last 6 months</li>
              <li>Missed pickups have decreased by 30% since implementing the new routing system</li>
              <li>User engagement is growing steadily, with a 15% increase in active users</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;