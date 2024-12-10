import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing Cookies for authentication management
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faHome,
  faClipboard,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userRole');
    Cookies.remove('userEmail');

    window.location.href = '/';
  };

  // Safely get the user type and default to an empty string if undefined
  const userType = Cookies.get('userRole') || '';

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-3 rounded-lg md:hidden shadow-lg hover:bg-indigo-700 transition-colors"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 shadow-xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 z-40`}
      >
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">HomeKey</h1>
          <p className="text-sm text-gray-500 mt-1">Property Management</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-6 space-y-2 px-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg text-base font-medium flex items-center space-x-3 transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/property_list"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg text-base font-medium flex items-center space-x-3 transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            <span>Properties</span>
          </NavLink>

          <NavLink
            to="/document"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg text-base font-medium flex items-center space-x-3 transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faClipboard} className="w-5 h-5" />
            <span>Documents</span>
          </NavLink>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4 px-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-indigo-600 text-xl"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {Cookies.get('userEmail') || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {userType
                  ? userType.charAt(0).toUpperCase() +
                    userType.slice(1) +
                    ' Account'
                  : 'Unknown Account'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
