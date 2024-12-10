import React, { useState } from 'react';
import Button from '../components/Button';

const SignUp = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError(''); // Reset error messages

    if (!role) {
      setError('Please select whether you are a buyer or a seller.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const payload = {
      email_address: email,
      password,
      role: role.toLowerCase(), // Ensure role matches backend format
    };

    try {
      setLoading(true); // Show loading spinner
      const response = await fetch('https://homekey-backend.vercel.app/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Redirect to login after successful signup
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <img
          src="/signup.jpg"
          alt=""
          className="w-24 h-24 mx-auto rounded-full -mt-12 shadow-md border-4 border-white"
        />
        <h1 className="text-2xl font-bold text-center text-indigo-600 mt-4">Create an Account</h1>
        <p className="text-sm text-gray-500 text-center">Join us and start your journey</p>
        <form onSubmit={handleSignUp} className="space-y-4 mt-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Are you a buyer or a seller?
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Signing Up</span>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
