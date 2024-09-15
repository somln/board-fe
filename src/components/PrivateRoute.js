import React from 'react';
import { Navigate } from 'react-router-dom';
import { keycloakService } from '../keycloakService';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = keycloakService.getToken() !== null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;