import React from 'react';
import { Navigate } from 'react-router-dom';
import { keycloakService } from '../keycloakService';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = keycloakService.isLoggedIn();
   // 인증되지 않은 사용자일 경우 루트 url로
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;