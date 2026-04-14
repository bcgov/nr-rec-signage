import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !hasRole('admin')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
