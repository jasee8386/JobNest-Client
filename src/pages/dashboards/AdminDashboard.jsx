import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // users, jobs, applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useSelector((state) => state.theme.value);
  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "users") {
          const res = await axios.get(`${backendBaseUrl}/admin/users`, { headers });
          setUsers(res.data);
        } else if (activeTab === "jobs") {
          const res = await axios.get(`${backendBaseUrl}/admin/jobs`, { headers });
          setJobs(res.data);
        } else if (activeTab === "applications") {
          const res = await axios.get(`${backendBaseUrl}/admin/applications`, { headers });
          setApplications(res.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${backendBaseUrl}/admin/user/${userId}`, { headers });
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Verify user
  const handleVerifyUser = async (userId) => {
    try {
      await axios.patch(`${backendBaseUrl}/admin/user/${userId}/verify`, {}, { headers });
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, isVerified: true } : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify user");
    }
  };

  // Verify job
  const handleVerifyJob = async (jobId) => {
    try {
      await axios.patch(`${backendBaseUrl}/admin/job/${jobId}/verify`, {}, { headers });
      setJobs(
        jobs.map((job) => (job._id === jobId ? { ...job, isVerified: true } : job))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify job");
    }
  };

  // Verify application
  const handleVerifyApplication = async (appId) => {
    try {
      await axios.patch(
        `${backendBaseUrl}/admin/application/${appId}/verify`,
        {},
        { headers }
      );
      setApplications(
        applications.map((app) =>
          app._id === appId ? { ...app, status: "Shortlisted" } : app
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify application");
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === "users" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === "jobs" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            Jobs
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === "applications" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            {/* Users Table */}
            {activeTab === "users" && (
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700">Name</th>
                    <th className="p-3 text-left text-gray-700">Email</th>
                    <th className="p-3 text-left text-gray-700">Role</th>
                    <th className="p-3 text-left text-gray-700">Verified</th>
                    <th className="p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3">{u.isVerified ? "Yes" : "No"}</td>
                      <td className="p-3 flex gap-2">
                        {!u.isVerified && (
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                            onClick={() => handleVerifyUser(u._id)}
                          >
                            Verify
                          </button>
                        )}
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Jobs Table */}
            {activeTab === "jobs" && (
              <table className="table-auto w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700">Title</th>
                    <th className="p-3 text-left text-gray-700">Employer</th>
                    <th className="p-3 text-left text-gray-700">Verified</th>
                    <th className="p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">{job.title}</td>
                      <td className="p-3">{job.employer?.name}</td>
                      <td className="p-3">{job.isVerified ? "Yes" : "No"}</td>
                      <td className="p-3">
                        {!job.isVerified && (
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                            onClick={() => handleVerifyJob(job._id)}
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Applications Table */}
            {activeTab === "applications" && (
              <table className="table-auto w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700">Job</th>
                    <th className="p-3 text-left text-gray-700">Applicant</th>
                    <th className="p-3 text-left text-gray-700">Status</th>
                    <th className="p-3 text-left text-gray-700">Applied At</th>
                    <th className="p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td className="p-3">{app.job?.title}</td>
                      <td className="p-3">{app.applicant?.name}</td>
                      <td className="p-3">{app.status}</td>
                      <td className="p-3">{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="p-3">
                        {app.status === "Pending" && (
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                            onClick={() => handleVerifyApplication(app._id)}
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
