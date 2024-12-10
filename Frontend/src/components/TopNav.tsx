import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <nav className="top-0 left-0 w-full bg-gradient-to-b from-blue-100 to-indigo-100 bg-opacity-85 z-50">
      {/* Desktop and Mobile Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600">
            <FontAwesomeIcon icon={faHome} className="text-white" />
          </div>
          <span className="text-[#1A202C] font-bold text-2xl font-sans">Homekey</span>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition-colors duration-200"
          >
            Buy
          </a>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition-colors duration-200"
          >
            Sell
          </a>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Right: Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Login Button */}
          <Button
            variant="secondary"
            className="py-2 px-6 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition duration-200"
            onClick={() => navigate('/login')} // Navigate to Login page
          >
            Login
          </Button>
          {/* Sign Up Button */}
          <Button
            variant="primary"
            className="py-2 px-6 bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-200"
            onClick={() => navigate('/register')} // Navigate to Sign Up page
          >
            Sign Up
          </Button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-start py-4 px-6 space-y-4">
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition duration-200"
          >
            Buy
          </a>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition duration-200"
          >
            Sell
          </a>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium font-sans hover:text-indigo-600 transition duration-200"
          >
            Contact
          </a>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition duration-200"
              onClick={() => navigate('/login')} // Navigate to Login page
            >
              Login
            </button>
            <button
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-200"
              onClick={() => navigate('/register')} // Navigate to Sign Up page
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
