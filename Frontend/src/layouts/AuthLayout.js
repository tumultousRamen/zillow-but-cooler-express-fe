import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <header className="absolute top-5 left-5">
        <h1 className="text-2xl font-bold text-indigo-600">Homekey</h1>
      </header>
      <main className="flex justify-center items-center w-full px-5">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
};

export default AuthLayout;
