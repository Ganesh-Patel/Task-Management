import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'; // Social media icons

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container for the sections */}
        <div className="flex flex-wrap justify-center md:justify-between items-start space-y-8 md:space-y-0">
          
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className='text-4xl py-1 font-bold text-teal-400'>Task Manager</h1>
            <p className="text-sm leading-relaxed max-w-xs mt-0">
              Task Manager is your go-to app for organizing and tracking tasks efficiently. Stay on top of your to-do list and manage projects with ease.
            </p>
          </div>

          {/* Address and Contact */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-teal-400 font-bold mb-2">Contact Us</h4>
            <p className="text-sm leading-relaxed">
              456 Productivity Lane,<br />
              Suite 101, San Francisco, CA 94107<br />
              Phone: (987) 654-3210<br />
              Email: support@taskmanager.com
            </p>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-teal-400 font-bold mb-2">Follow Us</h4>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors duration-300">
                <FiFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors duration-300">
                <FiTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors duration-300">
                <FiInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors duration-300">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            © 2024 Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
