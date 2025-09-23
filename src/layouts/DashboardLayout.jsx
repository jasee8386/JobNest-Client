import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
     const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decoded = jwt_decode(token);
      role = decoded.role; // get role from token
    } catch {
      localStorage.removeItem("token");
      role = "";
    }
  }
  const navLinks = {
    admin: [
      { name: "Manage Users", path: "/dashboard/admin" },
      { name: "Manage Jobs", path: "/dashboard/admin/jobs" },
    ],
    employer: [
      { name: "My Jobs", path: "/dashboard/employer" },
      { name: "Applicants", path: "/dashboard/employer/applicants" },
    ],
    jobseeker: [
      { name: "Job Listings", path: "/dashboard/jobseeker" },
      { name: "My Applications", path: "/dashboard/jobseeker/applications" },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          {navLinks[role]?.map((link) => (
            <li key={link.path} className="mb-2">
              <Link to={link.path} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
