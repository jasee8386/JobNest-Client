
import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Or from cookies

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode(token);
    if (decoded.role !== "admin") return <Navigate to="/login" />;
    return children;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
