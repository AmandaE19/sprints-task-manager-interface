import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  
  const isAuthenticated = () => {
    return true;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;