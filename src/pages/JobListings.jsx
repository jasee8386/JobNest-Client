import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import JobCategories from "../components/JobCategories";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const theme = useSelector((state) => state.theme.value);

  const role = token ? jwt_decode(token).role : "";

  const fetchJobs = async (query = "", pageNumber = 1) => {
    try {
      const res = await axios.get(`${backendBaseUrl}/jobs`, {
        params: { search: query, page: pageNumber, limit: 6 },
      });
      setJobs(res.data.jobs || res.data); // depending on backend response
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs(search, page);
  }, [search, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs(search, 1);
  };

  const applyJob = async (jobId) => {
    if (!token) {
      setMessage("Please login as job seeker to apply.");
      return;
    }
    try {
      const res = await axios.post(
        `${backendBaseUrl}/application/${jobId}/apply`,
        {
          resume: "https://example.com/resume.pdf", // replace with actual file upload or URL
          coverLetter: "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error applying");
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen p-6 bg-base-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Search by title, skills, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
  <JobCategories onSelect={(cat) => {
        setSearch(cat);
        setPage(1);
        fetchJobs(cat, 1);
      }} />
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      {jobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{job.title}</h3>
              <p className="text-gray-600">{job.employer?.name || "Company"}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm mt-1">{job.jobType} | {job.workType}</p>

              {role === "jobseeker" ? (
                <button
                  onClick={() => applyJob(job._id)}
                  className="mt-3 w-full bg-green-600 text-white py-1 rounded"
                >
                  Apply
                </button>
              ) : (
                <Link
                  to={`/jobs/${job._id}`}
                  className="mt-3 block text-center bg-blue-600 text-white py-1 rounded"
                >
                  View Details
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${p === page ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
