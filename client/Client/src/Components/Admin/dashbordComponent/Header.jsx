// Header.jsx
import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ notifications, showNotifications, setShowNotifications, markAsRead }) => {
  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">E-Garbage Management Dashboard</h1>
        <div className="flex items-center">
          <div className="relative">
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <p className="text-sm text-gray-700">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notif.type === 'alert' ? 'Critical Alert' : 
                              notif.type === 'warning' ? 'Warning' : 'Information'}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500">No notifications</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;