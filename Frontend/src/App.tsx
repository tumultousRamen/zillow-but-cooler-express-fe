import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProtectedRoute from './layouts/ProtectedRoute';
import PublicRoute from './layouts/PublicRoute';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './routes/ForgotPassword';
import Home from './routes/Home';
import Login from './routes/Login';
import Page2 from './routes/Page2';
import Page3 from './routes/Page3';
import Page4 from './routes/Page4';
import SignUp from './routes/SignUp';
import Index from './routes/Index';
import PropertyDetails from './routes/PropertyDetails';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authToken in cookies
    const authToken = Cookies.get('authToken');
    setIsAuthenticated(!!authToken); // Set to true if authToken exists
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Index />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={() => {
                setIsAuthenticated(true); // Update state on successful login
              }}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected Routes with MainLayout */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Home />} />
          <Route path="/property_list" element={<Page2 />} />
          <Route path="/document" element={<Page4 />} />
        </Route>

        {/* Protected Route for Page3 without MainLayout */}
        <Route
          path="/post_property"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Page3 />
            </ProtectedRoute>
          }
        />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
