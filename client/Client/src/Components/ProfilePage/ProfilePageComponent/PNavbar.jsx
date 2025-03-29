import React, { useState, useEffect, useRef } from 'react';
import { User, Menu, X, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Simulated logged-in state (replace with actual auth logic)
  const isLoggedIn = true; // Assuming user is logged in based on "Welcome, Amanda"

  // Handle scroll and active link
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const pathname = location.pathname;
    if (pathname === '/') setActiveLink('Home');
    else if (pathname === '/RequestPage') setActiveLink('Request');
    else if (pathname === '/bin-locations') setActiveLink('BinLocation');
    else if (pathname === '/Time') setActiveLink('Schedule');
    else if (pathname === '/UserProfileView') setActiveLink('Profile');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Request', path: '/RequestPage' },
    { name: 'Bin Locations', path: '/bin-locations' },
    { name: 'Schedule', path: '/Time' },
    { name: 'Profile', path: '/UserProfileView' },
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
          background: linear-gradient(270deg, #14B8A6, #34D399, #6EE7B7);
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-out ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Leaf
              size={28}
              className="text-teal-500 transition-transform duration-300 group-hover:rotate-45"
            />
            <span className="ml-2 text-xl font-bold tracking-tight">
              <span className="text-gray-900">Waste</span>
              <span className="text-teal-500">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-gray-700 hover:text-teal-500 font-medium transition-colors duration-200 ${
                  activeLink === link.name ? 'text-teal-500' : ''
                }`}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 transition-transform duration-300 origin-center ${
                    activeLink === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden lg:block text-gray-600 hover:text-teal-500 font-medium transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="hidden lg:block px-4 py-1.5 rounded-lg text-white font-medium gradient-flow shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : null}

            {/* User Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors duration-200"
                aria-expanded={showDropdown}
              >
                <User size={20} className="text-teal-600" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 border border-gray-100 z-50">
                  {[
                    { name: 'Profile', path: '/UserProfileView' },
                    { name: 'Settings', path: '/settings' },
                    { name: 'Logout', path: '/logout' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-md transition-colors duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-teal-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 bg-white shadow-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-md font-medium transition-colors duration-200 ${
                  activeLink === link.name ? 'bg-teal-50 text-teal-500' : ''
                }`}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-gray-700 hover:bg-teal-50 hover:text-teal-500 rounded-md font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 text-white gradient-flow rounded-md font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default PNavbar;