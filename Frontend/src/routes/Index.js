import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBuilding, faStar } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../components/TopNav'; // Importing the Navbar component

const Index = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen">
      {/* Top Navigation */}
      <TopNav />

      {/* Hero Section */}
      <section className="px-8 py-24 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              Find your dream home, <span className="text-indigo-600">today</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover properties to buy or sell in just a few clicks.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg">
                Browse Properties
              </button>
              <button className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 shadow-md">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <img
              src="./sample.png"
              alt="Property"
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute top-4 left-4 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-lg font-bold text-gray-900">Manuel Villa</h2>
              <p className="text-sm text-gray-600">
                "I loved how smooth the process was, and finally got the house we wanted."
              </p>
              <div className="flex space-x-4 mt-2 text-sm">
                <p className="text-gray-900 font-semibold">Saved: $1,500</p>
                <p className="text-gray-900 font-semibold">Process: 24 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg">
              <FontAwesomeIcon icon={faUsers} className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">10k+ Sellers</h2>
            <p className="text-gray-600">believe in our service</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg">
              <FontAwesomeIcon icon={faBuilding} className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">50k+ properties</h2>
            <p className="text-gray-600">ready for occupancy</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg">
              <FontAwesomeIcon icon={faStar} className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">4.9/5 Rating</h2>
            <p className="text-gray-600">from 3,264 reviews</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Ready to make a move?
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied customers and start your journey today.
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
