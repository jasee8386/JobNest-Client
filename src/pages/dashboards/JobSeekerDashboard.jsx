import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useSelector((state) => state.theme.value);
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
    <div data-theme={theme} className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Job Seeker Dashboard</h1>
          {/* ✅ Submit new applications */}
          <Link
            to="/jobs" // Where the user can browse & apply for jobs
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Browse Jobs
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading applications...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-700 text-lg">You have not applied for any jobs yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="table-auto w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-gray-700">Job Title</th>
                  <th className="p-3 text-left text-gray-700">Company</th>
                  <th className="p-3 text-left text-gray-700">Status</th>
                  <th className="p-3 text-left text-gray-700">Applied At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-semibold">{app.job?.title}</td>
                    <td className="p-3">{app.job?.employer?.name}</td>
                    {/* ✅ Styled status badges */}
                    <td className="p-3">
                      {app.status === "Pending" && (
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
                          {app.status}
                        </span>
                      )}
                      {app.status === "Accepted" && (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                          {app.status}
                        </span>
                      )}
                      {app.status === "Rejected" && (
                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                          {app.status}
                        </span>
                      )}
                    </td>
                    <td className="p-3">{new Date(app.appliedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobSeekerDashboard;
