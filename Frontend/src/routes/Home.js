import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faUserCircle,
  faChartLine,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';

const SellerDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg rounded-lg p-4 hover:shadow-2xl">
              <h3 className="text-sm font-medium">Total Properties</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg rounded-lg p-4 hover:shadow-2xl">
              <h3 className="text-sm font-medium">Live on FSH</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg rounded-lg p-4 hover:shadow-2xl">
              <h3 className="text-sm font-medium">Active Offers</h3>
              <p className="text-3xl font-bold">2</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg rounded-lg p-4 hover:shadow-2xl">
              <h3 className="text-sm font-medium">In Escrow</h3>
              <p className="text-3xl font-bold">1</p>
            </div>
          </div>

          {/* Buyer Activity Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Buyer Activity Over Time
              </h3>
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-indigo-600 text-2xl"
              />
            </div>
            <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md flex items-center justify-center text-gray-500 text-lg font-semibold">
              Chart Coming Soon
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button className="text-sm font-medium text-indigo-600 hover:underline">
                7 Days
              </button>
              <button className="text-sm font-medium text-gray-500 hover:underline">
                30 Days
              </button>
              <button className="text-sm font-medium text-gray-500 hover:underline">
                Overtime
              </button>
            </div>
          </div>

          {/* Recent Offers */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Offers
              </h3>
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="text-green-600 text-2xl"
              />
            </div>
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex justify-between items-center">
                <span className="text-gray-700">Benny L</span>
                <span className="font-bold text-gray-800">$200K</span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <span className="text-gray-700">Alan</span>
                <span className="font-bold text-gray-800">$500K</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
