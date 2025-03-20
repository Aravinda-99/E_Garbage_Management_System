import React, { useState, useEffect } from 'react';
import Header from '../dashbordComponent/Header.jsx';
import UserStatistics from '../dashbordComponent/UserStatistics.jsx';
import StatusOverview from '../dashbordComponent/StatusOverview.jsx';
import TimeSlotAvailability from '../dashbordComponent/TimeSlotAvailability.jsx';
import ReportsAnalytics from '../dashbordComponent/ReportsAnalytics.jsx';

const DashboardOverview = () => {
  // State for various dashboard data
  const [userStats, setUserStats] = useState({
    citizens: 1245,
    collectors: 68,
    admins: 12
  });
  
  const [requestStatus, setRequestStatus] = useState([
    { name: 'Active', value: 124, color: '#10B981' },
    { name: 'Completed', value: 842, color: '#6366F1' },
    { name: 'Pending', value: 38, color: '#F59E0B' }
  ]);
  
  const [binLocations, setBinLocations] = useState([
    { id: 1, lat: 40.7128, lng: -74.0060, status: 'empty' },
    { id: 2, lat: 40.7218, lng: -73.9980, status: 'full' },
    { id: 3, lat: 40.7138, lng: -74.0160, status: 'empty' },
    { id: 4, lat: 40.7108, lng: -74.0030, status: 'full' }
  ]);
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Bin #241 is full and needs collection', type: 'alert', read: false },
    { id: 2, message: '3 pending requests in Downtown area', type: 'warning', read: false },
    { id: 3, message: 'System maintenance scheduled for tomorrow', type: 'info', read: true }
  ]);
  
  const [analyticsData, setAnalyticsData] = useState([
    { month: 'Jan', collections: 120, missedPickups: 5, engagement: 78 },
    { month: 'Feb', collections: 132, missedPickups: 8, engagement: 82 },
    { month: 'Mar', collections: 101, missedPickups: 4, engagement: 74 },
    { month: 'Apr', collections: 134, missedPickups: 3, engagement: 85 },
    { month: 'May', collections: 148, missedPickups: 6, engagement: 90 },
    { month: 'Jun', collections: 130, missedPickups: 7, engagement: 83 }
  ]);
  
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: '09:00 AM', date: '2025-03-20', location: 'Downtown', status: 'booked' },
    { id: 2, time: '10:00 AM', date: '2025-03-20', location: 'North Side', status: 'available' },
    { id: 3, time: '11:00 AM', date: '2025-03-20', location: 'East Side', status: 'booked' },
    { id: 4, time: '01:00 PM', date: '2025-03-20', location: 'West Side', status: 'available' },
    { id: 5, time: '02:00 PM', date: '2025-03-20', location: 'South Side', status: 'available' }
  ]);

  const [selectedDate, setSelectedDate] = useState('2025-03-20');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulating API calls
  useEffect(() => {
    // In a real app, these would be API calls
    console.log('Fetching dashboard data...');
    
    // Simulate data fetch delay
    const timer = setTimeout(() => {
      console.log('Data fetched successfully');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to handle notification click
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? {...notif, read: true} : notif
      )
    );
  };

  // Function to handle download report
  const downloadReport = () => {
    console.log('Downloading report...');
    // In a real app, this would generate a PDF using jspdf
    alert('Report downloaded successfully');
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto">
      <Header 
        notifications={notifications} 
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        markAsRead={markAsRead}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <UserStatistics userStats={userStats} />
        
        <StatusOverview 
          requestStatus={requestStatus} 
          binLocations={binLocations} 
        />
        
        <TimeSlotAvailability 
          timeSlots={timeSlots}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        
        <ReportsAnalytics 
          analyticsData={analyticsData}
          downloadReport={downloadReport}
        />
      </main>
    </div>
  );
};

export default DashboardOverview;