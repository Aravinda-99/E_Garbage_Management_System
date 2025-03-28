import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import { Leaf } from 'lucide-react'; // If using Lucide icons

const footerData = [
  {
    title: 'About',
    links: [
      { label: 'Our Mission', href: '#' },
      { label: 'How It Works', href: '#' },
      { label: 'Certifications', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'E-Waste Collection', href: '#' },
      { label: 'Recycling Programs', href: '#' },
      { label: 'Business Solutions', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join The Movement', href: '#' },
      { label: 'Success Stories', href: '#' },
      { label: 'Events', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQs', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="pt-10 pb-6 bg-gradient-to-r from-green-50 to-teal-100 dark:from-gray-900 dark:to-teal-900 border-t border-green-200 dark:border-green-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and description */}
          <div className="md:max-w-xs">
            <Link to="/" className="flex items-center group">
              <Leaf
                size={28}
                className="text-green-600 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
              />
              <span className="ml-2 text-2xl font-extrabold tracking-tight">
                <span className="text-gray-900 dark:text-white">Waste</span>
                <span className="text-green-600">Wise</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Transforming e-waste into resources through sustainable recycling and community action.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {footerData.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-10 py-4 border-t border-b border-gray-200 dark:border-gray-700 grid grid-cols-4 gap-2 text-center">
          {[
            { metric: '15M+', label: 'Items Recycled' },
            { metric: '250+', label: 'Locations' },
            { metric: '120K', label: 'Trees Saved' },
            { metric: '85%', label: 'Recovery Rate' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-lg font-bold text-green-600 dark:text-green-500">{item.metric}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* After footer */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 EcoCircuit. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex space-x-3 mt-3 sm:mt-0">
            {[
              { name: 'Twitter', svg: <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /> },
              { name: 'Instagram', svg: <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /> },
              { name: 'LinkedIn', svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="p-1.5 rounded-full text-gray-500 hover:text-green-600 bg-gray-100 hover:bg-green-100 dark:bg-gray-800 dark:hover:bg-green-900 transition-all"
              >
                <span className="sr-only">{social.name}</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  {social.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;