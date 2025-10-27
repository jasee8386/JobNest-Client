import React, { useEffect, useState } from "react";
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
 import { useSelector } from "react-redux";
const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const JobListSection = ({ category }) => { 
   const theme = useSelector((state) => state.theme.value);
      const [search, setSearch] = useState(""); 
    const [jobs, setJobs] = useState([]); 
     // Fetch jobs from backend
  const fetchJobs = async (query = "", cat = "") => {
    try {
      const url = query
        ? `${backendBaseUrl}/jobs?search=${encodeURIComponent(query)}`
        : `${backendBaseUrl}/jobs`;
      const res = await axios.get(url, { params: { search: query, category: cat } });
      setJobs(res.data.jobs || res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs(search, category);
  }, [category]);
 const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };
  return (
     <div>
        <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8"
      >
        <input
          type="text"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
              {/* Job Listings */}
              <section
                className="jobimg min-h-screen bg-cover bg-center relative"
                           >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="jobimg-content text-neutral-content text-center relative z-10 flex flex-col items-center gap-6">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">Latest Jobs</h2>
                    {jobs.length === 0 ? (
                      <p className="text-center">No jobs found.</p>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                          <Link
                            to={`/jobs/${job._id}`}
                            key={job._id}
                            className="border p-4 rounded hover:shadow-lg transition"
                          >
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <p className="text-gray-600">
                              {job.employer?.name || "Company"}
                            </p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="text-sm mt-1">
                              {job.jobType} | {job.workType}
                            </p>                    {job.category && (
                      <p className="text-sm text-green-600 mt-2">
                        Category: {job.category}
                      </p>
                    )}

                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
    </div>
     
  )
}

export default JobListSection