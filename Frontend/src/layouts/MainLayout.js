import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full pl-72">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
