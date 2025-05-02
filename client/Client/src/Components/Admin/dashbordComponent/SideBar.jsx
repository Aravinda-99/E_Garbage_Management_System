import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const SideBar = ({ onToggle, onMenuItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    // Try to get user data from localStorage
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        // Set user name from firstName and lastName if available
        const firstName = userData.userFirstName || '';
        const lastName = userData.userLastName || '';
        setUserName(firstName && lastName ? `${firstName} ${lastName}` : userData.userName || 'User');
        
        // Check roles and set user role
        if (userData.role && userData.role.some(role => role.roleName === 'ADMIN' || role.roleName === 'Admin')) {
          setUserRole('Administrator');
        } else {
          setUserRole('User');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('User');
        setUserRole('Guest');
      }
    } else {
      // Fallback if no user data found
      setUserName('User');
      setUserRole('Guest');
    }
  }, []);

  const menuItems = [
    { icon: IconDashboard, label: 'Dashboard' },
    { icon: IconUser, label: 'User Management' },
    { icon: IconGitPullRequest, label: 'Request Management' },
    { icon: IconBoxSeam, label: 'Time Schedules' },
    { icon: IconGitPullRequest, label: 'FeedBack M' },
    { icon: IconGitPullRequest, label: 'Complain M' },
    { icon: IconBoxSeam, label: 'BinLocations' },
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

  // Handle logout function
  const handleLogout = () => {
    // Clear JWT token
    localStorage.removeItem('jwtToken');
    
    // Clear any user data
    localStorage.removeItem('userData');
    
    // Redirect to login page
    navigate('/login');
  };

  // Get user initials for the avatar
  const getInitials = () => {
    if (!userName || userName === 'User') return 'U';
    
    const nameParts = userName.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return userName[0]?.toUpperCase() || 'U';
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
            {getInitials()}
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
          onClick={handleLogout}
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