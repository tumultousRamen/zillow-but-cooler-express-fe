import React from 'react';
import Button from '../components/Button';

const ForgotPassword = () => {
  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert('Password reset instructions sent to your email!');
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <img
          src="/forgot.jpg"
          alt=''
          className="w-24 h-24 mx-auto rounded-full -mt-12 shadow-md border-4 border-white"
        />
        <h1 className="text-2xl font-bold text-center text-pink-600 mt-4">Forgot Password?</h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your email to reset your password
        </p>
        <form onSubmit={handlePasswordReset} className="space-y-4 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Reset Password
          </Button>
          {/* <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Reset Password
          </button> */}
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-pink-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;