import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

// This component will protect routes that require a specific role.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();

  // If there's no role, the user is not logged in. Redirect to login.
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not in the list of allowed roles, redirect.
  // This prevents a student from accessing the teacher dashboard, for example.
  if (!allowedRoles.includes(role)) {
    // For simplicity, we redirect to login. You could also have a 403 "Forbidden" page.
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in and has the correct role, render the requested component.
  return children;
}