import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const JobSeekerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode(token);
    if (decoded.role !== "jobseeker") return <Navigate to="/login" />;
    return children;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default JobSeekerRoute;
