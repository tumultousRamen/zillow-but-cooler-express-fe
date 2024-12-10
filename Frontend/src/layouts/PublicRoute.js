import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ isAuthenticated, children }) => {
  const authToken = Cookies.get("authToken");
  if (isAuthenticated || authToken) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default PublicRoute;
