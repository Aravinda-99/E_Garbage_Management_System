import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  MessageCircle, 
  Search,
  UserCircle2,
  TrendingUp,
  AlertOctagon,
  Clock4
} from 'lucide-react';

const complaints = [
  {
    id: "COM-001",
    title: "Product delivery delayed",
    customer: "John Smith",
    status: "open",
    priority: "high",
    date: "2024-03-15",
    description: "Order #123 has been delayed for over a week without any updates."
  },
  {
    id: "COM-002",
    title: "Incorrect item received",
    customer: "Sarah Johnson",
    status: "in-progress",
    priority: "medium",
    date: "2024-03-14",
    description: "Received a blue shirt instead of the ordered red shirt."
  },
  {
    id: "COM-003",
    title: "Refund not processed",
    customer: "Mike Brown",
    status: "resolved",
    priority: "high",
    date: "2024-03-13",
    description: "Refund for returned item has not been processed after 5 days."
  }
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    'open': 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800'
  };

  const statusIcons = {
    'open': <AlertCircle className="w-4 h-4" />,
    'in-progress': <Clock className="w-4 h-4" />,
    'resolved': <CheckCircle2 className="w-4 h-4" />
  };

  return (
    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const priorityStyles = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-orange-100 text-orange-800',
    'low': 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${priorityStyles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  </div>
);

function ComplainOverView() {
  // Calculate statistics
  const totalComplaints = complaints.length;
  const openComplaints = complaints.filter(c => c.status === 'open').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Complaints Overview</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Complaints" 
            value={totalComplaints} 
            icon={MessageCircle}
            trend="12% increase" 
          />
          <StatCard 
            title="Open Complaints" 
            value={openComplaints} 
            icon={AlertOctagon} 
          />
          <StatCard 
            title="In Progress" 
            value={inProgressComplaints} 
            icon={Clock4} 
          />
          <StatCard 
            title="Resolved" 
            value={resolvedComplaints} 
            icon={CheckCircle2}
            trend="85% resolution rate" 
          />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search complaints..."
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>

        {/* Complaints List */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <li key={complaint.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {complaint.id} - {complaint.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <StatusBadge status={complaint.status} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserCircle2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>{complaint.customer}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{complaint.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <PriorityBadge priority={complaint.priority} />
                        <span className="flex items-center text-sm text-gray-500">
                          <MessageCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          2 comments
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{complaint.date}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ComplainOverView;