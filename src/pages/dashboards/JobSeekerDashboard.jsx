import React, { useEffect, useState } from "react";
import axios from "axios";

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch my applications
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendBaseUrl}/applications/my`, { headers });
        setApplications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Job Seeker Dashboard</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Job Title</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="p-2 border">{app.job?.title}</td>
                <td className="p-2 border">{app.job?.employer?.name}</td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">{new Date(app.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
