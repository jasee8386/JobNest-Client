import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Header from "../components/Header";
import Footer from "../components/Footer";
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

  const role = token ? jwtDecode(token).role : "";

  const fetchJobs = async (query = "", pageNumber = 1, category = "") => {
    try {
      const res = await axios.get(`${backendBaseUrl}/jobs`, {
      params: { search: query, page: pageNumber, limit: 6, category },
    });
    setJobs(res.data.jobs || res.data);
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
          resume: "https://example.com/resume.pdf",
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
    <div data-theme={theme} className="min-h-screen flex flex-col w-full">
      

      {/* ✅ Main content area */}
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>

        {/* 🔍 Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-2 mb-6"
        >
          <input
            type="text"
            placeholder="Search by title, skills, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-80"
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Search
          </button>
        </form>

        {/* 🏷️ Job Categories Filter */}
        <JobCategories
          onSelect={(cat) => {
            setSearch(cat);
            setPage(1);
            fetchJobs(cat, 1);
          }}
        />

        {/* 🔔 Messages */}
        {message && <p className="text-center text-red-600 mb-4">{message}</p>}

        {/* 💼 Job Cards */}
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                <h3 className="font-semibold text-xl mb-1">{job.title}</h3>
                <p className="text-gray-600">{job.employer?.name || "Company"}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-sm mt-2 text-gray-700">
                  {job.jobType} | {job.workType}
                </p>

                {role === "jobseeker" ? (
                  <button
                    onClick={() => applyJob(job._id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Apply
                  </button>
                ) : (
                  <Link
                    to={`/jobs/${job._id}`}
                    className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 🔢 Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </main>

    </div>
  );
};

export default JobListings;
