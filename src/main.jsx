import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useSelector } from 'react-redux';
import "./styles/global.css";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import { store } from "./globalState/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import JobDetails from "./pages/JobDetails";
import JobListings from "./pages/JobListings";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployerDashboard from "./pages/dashboards/EmployerDashboard"
import JobSeekerDashboard from "./pages/dashboards/JobSeekerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
const ThemeWrapper = ({ children }) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div data-theme={theme} className="min-h-screen">
      {children}
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <Register />,
      },
      { path: "jobs", element: <JobListings /> },
      { path: "jobs/:jobId", element: <JobDetails /> },
    ],
  },
  {
    path: "/dashboard",
    children: [
      { path: "admin", element: <AdminDashboard /> },
      { path: "employer", element: <EmployerDashboard /> },
      { path: "jobseeker", element: <JobSeekerDashboard /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
          <ThemeWrapper>

        <RouterProvider router={router} /></ThemeWrapper>

    </Provider>
          
  </StrictMode>
);
