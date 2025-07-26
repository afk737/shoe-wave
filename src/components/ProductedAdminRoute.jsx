import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedAdminRoute;
