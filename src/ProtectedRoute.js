import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return token ? children : <Navigate to="/login" replace />; // Redirect if no token
};

export default ProtectedRoute;
