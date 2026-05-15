import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.is_staff) {
    // Redirect non-admins to the home page or login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
