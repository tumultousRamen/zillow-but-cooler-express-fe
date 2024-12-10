import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const authToken = Cookies.get("authToken");
  if (!isAuthenticated && !authToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
