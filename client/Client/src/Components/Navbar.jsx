import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, User, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('jwtToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
  }, [location]);

  // Handle scroll and entrance animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const timer = setTimeout(() => setIsVisible(true), 100);
    const pathname = location.pathname;
    if (pathname === '/') setActiveLink('Home');
    else if (pathname === '/RequestPage') setActiveLink('Request');
    else if (pathname === '/bin-locations') setActiveLink('Bin Locations');
    else if (pathname === '/time') setActiveLink('Schedule');

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location]);

  // Handle dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setShowDropdown(false);
    // Redirect to homepage
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Request', path: '/RequestPage' },
    { name: 'Bin Locations', path: '/bin-locations' },
    { name: 'Schedule', path: '/time' },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-flow {
          background: linear-gradient(270deg, #10B981, #34D399, #6EE7B7);
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 ease-out ${
          isScrolled ? 'bg-white shadow-2xl py-2' : 'bg-gradient-to-b from-white to-transparent py-4'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Leaf
              size={28}
              className="text-green-600 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
            />
            <span className="ml-2 text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900">Waste</span>
              <span className="text-green-600">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-gray-700 hover:text-green-600 font-medium transition-all duration-300 group
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 origin-center
                    ${activeLink === link.name ? 'bg-green-600 scale-x-100' : 'bg-green-400 scale-x-0 group-hover:scale-x-100'}`}
                />
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* Show Login/Signup only when user is not logged in */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`text-gray-600 hover:text-green-600 font-medium transition-all duration-300
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '500ms' }}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={`relative px-4 py-2 rounded-full text-white font-medium overflow-hidden transition-all duration-500
                    gradient-flow shadow-lg hover:shadow-xl transform hover:scale-105
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: '600ms' }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              /* User Avatar and Dropdown (only when logged in) */
              <div
                ref={dropdownRef}
                className={`relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '700ms' }}
              >
                <button
                  onClick={toggleDropdown}
                  className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 transform hover:rotate-12"
                  aria-expanded={showDropdown}
                >
                  <User size={20} className="text-green-600" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl p-2 border border-green-100 z-50">
                    <Link
                      to="/UserProfileView"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-green-100 transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-6 bg-white shadow-lg">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all duration-300
                  ${activeLink === link.name ? 'bg-green-50 text-green-600' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Conditionally render login/signup or profile options in mobile menu */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="block py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-3 px-4 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/UserProfileView"
                  className="block py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-300 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;