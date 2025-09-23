import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // users, jobs, applications
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Verify job
  const handleVerifyJob = async (jobId) => {
    try {
      await axios.put(`${backendBaseUrl}/admin/job/${jobId}/verify`, {}, { headers });
      setJobs(
        jobs.map((job) => (job._id === jobId ? { ...job, isVerified: true } : job))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify job");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "jobs" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "applications" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {/* Users Table */}
          {activeTab === "users" && (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Verified</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.role}</td>
                    <td className="p-2 border">{u.isVerified ? "Yes" : "No"}</td>
                    <td className="p-2 border">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
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
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Employer</th>
                  <th className="p-2 border">Verified</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="p-2 border">{job.title}</td>
                    <td className="p-2 border">{job.employer?.name}</td>
                    <td className="p-2 border">{job.isVerified ? "Yes" : "No"}</td>
                    <td className="p-2 border">
                      {!job.isVerified && (
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
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
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Job</th>
                  <th className="p-2 border">Applicant</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Applied At</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td className="p-2 border">{app.job?.title}</td>
                    <td className="p-2 border">{app.applicant?.name}</td>
                    <td className="p-2 border">{app.status}</td>
                    <td className="p-2 border">{new Date(app.appliedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
