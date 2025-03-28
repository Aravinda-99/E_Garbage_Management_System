import { useState } from 'react';
import { 
  IconDashboard, 
  IconBoxSeam, 
  IconChartBar, 
  IconSettings, 
  IconChevronRight,
  IconChevronLeft,
  IconBellRinging,
  IconMoon,
  IconSun,
  IconLogout,
  IconUser,
  IconGitPullRequest
} from '@tabler/icons-react';

const SideBar = ({ userName = "Alex Morgan", userRole = "Admin", onToggle, onMenuItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const menuItems = [
    { icon: IconDashboard, label: 'Dashboard' },
    { icon: IconUser, label: 'User Management' },
    { icon: IconGitPullRequest, label: 'Request Management' },
    { icon: IconBoxSeam, label: 'Inventory' },
    { icon: IconChartBar, label: 'Reports' },
    { icon: IconBellRinging, label: 'Notifications' },
    { icon: IconSettings, label: 'Settings' }
  ];

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    onToggle(newCollapsedState); // Notify parent component about sidebar state change
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleMenuItemClick = (label) => {
    onMenuItemClick(label); // Notify parent component about menu item click
  };

  return (
    <div className={`
      relative h-screen 
      ${collapsed ? 'w-20' : 'w-64'} 
      transition-all duration-300 ease-in-out
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}
      border-r border-gray-200 dark:border-gray-700
      flex flex-col
      shadow-lg
    `}>
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className={`
          absolute -right-3 top-20 
          bg-blue-500 hover:bg-blue-600 
          rounded-full p-1 
          shadow-md
          text-white
          transition-all duration-200
        `}
      >
        {collapsed ? 
          <IconChevronRight size={16} /> : 
          <IconChevronLeft size={16} />
        }
      </button>

      {/* Logo and header */}
      <div className={`
        flex items-center 
        ${collapsed ? 'justify-center' : 'justify-between'} 
        p-4 border-b border-gray-200 dark:border-gray-700
      `}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
            AM
          </div>
          <div className={`${collapsed ? 'hidden' : 'block'} transition-all duration-300`}>
            <h2 className="font-semibold">{userName}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleMenuItemClick(item.label)} // Call handler on click
                className={`
                  flex items-center gap-3 
                  rounded-lg p-3 w-full
                  transition-all duration-200
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <item.icon 
                  size={24} 
                  className="text-gray-700 dark:text-gray-300" 
                />
                <span className={`${collapsed ? 'hidden' : 'block'} transition-all duration-300`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button 
          onClick={toggleDarkMode}
          className={`
            flex items-center gap-3 
            rounded-lg p-3 w-full
            transition-all duration-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            text-gray-700 dark:text-gray-300
            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
        >
          {darkMode ? 
            <IconSun size={24} className="text-yellow-500" /> : 
            <IconMoon size={24} className="text-gray-700 dark:text-gray-300" />
          }
          <span className={`${collapsed ? 'hidden' : 'block'} transition-all duration-300`}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
        
        <button 
          className={`
            flex items-center gap-3 
            rounded-lg p-3 w-full
            transition-all duration-200
            hover:bg-red-100 dark:hover:bg-red-900/30
            text-red-600 dark:text-red-400
            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
        >
          <IconLogout size={24} />
          <span className={`${collapsed ? 'hidden' : 'block'} transition-all duration-300`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;