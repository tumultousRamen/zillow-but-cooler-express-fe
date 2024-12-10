import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // For managing cookies
import Button from '../components/Button'; // Importing the Button component
import { useNavigate } from 'react-router-dom'; // For navigation in React Router

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const authToken = Cookies.get('authToken');
    if (authToken) {
      // Redirect to the dashboard if the user is logged in
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show the loading spinner
    try {
      const response = await fetch('https://homekey-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const result = await response.json();

      if (result.status === 'success') {
        Cookies.set('authToken', JSON.stringify(result.data.id), { expires: 7 }); // Store ID as token
        Cookies.set('userRole', result.data.role, { expires: 7 }); // Store role
        Cookies.set('userEmail', result.data.email_address, { expires: 7 }); // Store email

        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // Hide the loading spinner
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <img
          src="/log.jpeg"
          alt="Login Illustration"
          className="w-24 h-24 mx-auto rounded-full -mt-12 shadow-md border-4 border-white"
        />
        <h1 className="text-2xl font-bold text-center text-indigo-600 mt-4">Welcome Back!</h1>
        <p className="text-sm text-gray-500 text-center">Login to access your account</p>
        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            variant="primary"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading} // Disable the button during loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Loading</span>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-indigo-600 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
