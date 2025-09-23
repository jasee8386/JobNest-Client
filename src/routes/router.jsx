import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/dashboards/AdminDashboard"
import EmployerDashboard from "../pages/dashboards/EmployerDashboard";
import JobSeekerDashboard from "../pages/dashboards/JobSeekerDashboard";

import AdminRoute from "./AdminRoute";
import EmployerRoute from "./EmployerRoute";
import JobSeekerRoute from "./JobSeekerRoute";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }, { path: "jobs", element: <JobListings /> },
      { path: "jobs/:jobId", element: <JobDetails /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, 
    children: [
      {
        path: "admin",
        element: 
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ,
      },
      {
        path: "employer",
        element: (
          <EmployerRoute>
            <EmployerDashboard />
          </EmployerRoute>
        ),
      },
      {
        path: "jobseeker",
        element: (
          <JobSeekerRoute>
            <JobSeekerDashboard />
          </JobSeekerRoute>
        ),
      },
    ],
  },
 ]);

export default router;
