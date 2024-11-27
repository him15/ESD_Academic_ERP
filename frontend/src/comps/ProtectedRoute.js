import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for version 4+

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    console.warn('No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check for role-based access
    if (requiredRole && decoded.department !== requiredRole) {
      console.warn('Access denied: insufficient permissions');
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('jwt'); // Clear invalid token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
