import React, { useState } from 'react';
import SideBar from './dashbordComponent/SideBar.jsx';
import DashboardOverview from './dashbordComponent/DashBoardOverview.jsx';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard'); // State to track active menu item

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item); // Update the active item when a menu item is clicked
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar component - fixed position */}
      <div className="fixed h-screen">
        <SideBar 
          onToggle={handleSidebarToggle} 
          onMenuItemClick={handleMenuItemClick} // Pass the handler to SideBar
        />
      </div>

      {/* Main content area - adjusts width based on sidebar state */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-20' : 'ml-64'} overflow-y-auto`}>
        {/* Conditionally render components based on activeItem */}
        {activeItem === 'Dashboard' && <DashboardOverview />}
        {/* Add other components for other menu items here */}
        {/* Example:
        {activeItem === 'Inventory' && <InventoryComponent />}
        {activeItem === 'Reports' && <ReportsComponent />}
        */}
      </div>
    </div>
  );
};

export default AdminDashboard;