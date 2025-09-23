import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch jobs created by employer
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendBaseUrl}/employer/jobs/my`, { headers });
        setJobs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const viewApplicants = async (jobId) => {
    try {
      const res = await axios.get(`${backendBaseUrl}/employer/jobs/${jobId}/applicants`, { headers });
      alert(
        res.data.length
          ? res.data.map((a) => `${a.name} (${a.email})`).join("\n")
          : "No applicants yet"
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching applicants");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employer Dashboard</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Applicants</th>
              <th className="p-2 border">Verified</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="p-2 border">{job.title}</td>
                <td className="p-2 border">{job.category}</td>
                <td className="p-2 border">{job.applicants.length}</td>
                <td className="p-2 border">{job.isVerified ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => viewApplicants(job._id)}
                  >
                    View Applicants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployerDashboard;
