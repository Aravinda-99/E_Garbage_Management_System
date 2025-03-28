import React, { useState, useEffect, useRef } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle scroll effect and entrance animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Set initial visibility after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Set active link based on current path
    const pathname = location.pathname;
    if (pathname === '/') setActiveLink('Home');
    else if (pathname === '/RequestPage') setActiveLink('Request');
    else if (pathname === '/bin-locations') setActiveLink('BinLocation');
    else if (pathname === '/Time') setActiveLink('Time');

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Navigation links with their corresponding routes
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Request', path: '/RequestPage' },
    { name: 'BinLocation', path: '/bin-locations' },
    { name: 'Time', path: '/Time' }
  ];

  return (
    <>
      {/* Inject style to fix white line */}
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>
      
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-lg py-1' : 'bg-white/90 py-2'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="w-full px-6 flex justify-between items-center h-12">
          <Link to="/" className="flex items-center group">
            {/* Logo SVG */}
            <div className="mr-2 text-blue-600 transition-transform duration-500 transform group-hover:rotate-12">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L26 14L14 26L2 14L14 2Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M14 7L21 14L14 21L7 14L14 7Z" fill="currentColor" />
              </svg>
            </div>
            
            {/* Text with shimmer effect */}
            <span className="text-xl font-bold relative">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ego
              </span>
              <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text text-transparent animate-shimmer"></span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`relative px-2 py-1 text-gray-700 hover:text-blue-600 transition-all duration-300 overflow-hidden
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 transform
                  ${activeLink === link.name ? 'scale-x-100' : 'scale-x-0'}`}></span>
                <span className="absolute inset-0 w-full h-full bg-blue-100 rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className={`text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '600ms' }}
            >
              Log in
            </Link>
            
            <Link 
              to="/signup"
              className={`bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all duration-300 
                shadow-md hover:shadow-lg relative overflow-hidden text-sm
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '700ms' }}
            >
              <span className="relative z-10">Sign up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 transform scale-x-0 origin-left transition-transform duration-500 hover:scale-x-100"></span>
            </Link>
            
            {/* Fixed Dropdown that doesn't auto-hide */}
            <div 
              ref={dropdownRef}
              className={`relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <button
                onClick={toggleDropdown} 
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                <User size={18} className="text-gray-700" />
              </button>
              
              {/* Dropdown menu that stays visible */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50 border border-gray-200">
                  <Link 
                    to="/UserProfileView" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <Link 
                    to="/logout" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-300
              ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
            style={{ transitionDelay: '900ms' }}
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-gray-800" />
            ) : (
              <Menu size={20} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-6 pt-2 pb-4 space-y-3 bg-white/95 shadow-inner">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`block py-2 px-2 transition-all duration-300 rounded-md transform
                  ${activeLink === link.name ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                  ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' }}  
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </Link>
            ))}
            <div className={`pt-2 mt-2 border-t border-gray-100 transition-all duration-300 transform
              ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
            >
              <Link to="/UserProfileView" className="flex items-center py-2 px-2 text-gray-700 hover:bg-gray-50 rounded-md group">
                <User size={16} className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;