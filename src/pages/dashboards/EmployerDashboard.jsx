import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ New state for Add Job form
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    category: "",
    location: "",
    expiryDate: "",
  });

  // ✅ New state for Applicants modal
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [currentApplicants, setCurrentApplicants] = useState([]);

  const theme = useSelector((state) => state.theme.value);
  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch jobs
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

  // ✅ Updated viewApplicants to open modal
  const viewApplicants = async (jobId) => {
    try {
      const res = await axios.get(`${backendBaseUrl}/employer/jobs/${jobId}/applicants`, { headers });
      setCurrentApplicants(res.data);
      setApplicantsModalOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching applicants");
    }
  };

  // ✅ Handle Add Job form submission
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendBaseUrl}/employer/jobs`,
        { ...newJob, requirements: newJob.requirements.split(",") },
        { headers }
      );
      alert("Job posted successfully!");
      setNewJob({
        title: "",
        description: "",
        requirements: "",
        category: "",
        location: "",
        expiryDate: "",
      });
      setShowForm(false);

      // ✅ Refetch jobs after adding
      const res = await axios.get(`${backendBaseUrl}/employer/jobs/my`, { headers });
      setJobs(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">Employer Dashboard</h1>

          {/* ✅ Rewritten: Toggle button instead of Link */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            {showForm ? "Cancel" : "Post New Job"}
          </button>
        </div>

        {/* ✅ Embedded Add Job form */}
        {showForm && (
          <form onSubmit={handleAddJob} className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
            <input
              type="text"
              placeholder="Requirements (comma separated)"
              value={newJob.requirements}
              onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newJob.category}
              onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Location"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              className="input input-bordered w-full"
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={newJob.expiryDate}
              onChange={(e) => setNewJob({ ...newJob, expiryDate: e.target.value })}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Post Job
            </button>
          </form>
        )}

        {/* Jobs Table */}
        {loading ? (
          <p className="text-gray-500 text-lg">Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="table-auto w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-gray-700">Title</th>
                  <th className="p-3 text-left text-gray-700">Category</th>
                  <th className="p-3 text-left text-gray-700">Applicants</th>
                  <th className="p-3 text-left text-gray-700">Verified</th>
                  <th className="p-3 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.category}</td>
                    <td className="p-3">{job.applicants.length}</td>
                    <td className="p-3">
                      {job.isVerified ? (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">Yes</span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">No</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition-colors duration-300"
                        onClick={() => viewApplicants(job._id)}
                      >
                        View Applicants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Applicants Modal */}
      {applicantsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 max-h-[80vh] overflow-y-auto p-6 relative">
            <h2 className="text-xl font-bold mb-4">Applicants</h2>
            {currentApplicants.length ? (
              <ul className="space-y-2">
                {currentApplicants.map((a) => (
                  <li key={a._id} className="border p-2 rounded hover:bg-gray-100 transition">
                    <p className="font-semibold">{a.applicant?.name}</p>
                    <p className="text-gray-600 text-sm">{a.applicant?.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet</p>
            )}
            <button
              onClick={() => setApplicantsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EmployerDashboard;
