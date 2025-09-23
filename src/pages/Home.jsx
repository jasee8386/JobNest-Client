import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobCategories from "../components/JobCategories";
import hero  from "../assets/hero.png"
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

  const theme = useSelector((state) => state.theme.value);

  // Decode role from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setRole(decoded.role);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  // Fetch jobs from backend
  const fetchJobs = async (query = "") => {
    try {
      const url = query
        ? `${backendBaseUrl}/jobs?search=${encodeURIComponent(query)}`
        : `${backendBaseUrl}/jobs`;
      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

 
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
          
  {/* Hero Section */}
  
<section
  className="hero min-h-screen"
  style={{
    backgroundImage:
      `url(${hero})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">   Launch Your Career Today</h1>
      <p className="mb-5">
         Explore thousands of jobs and take the next step toward your dream career
      </p>
      <div className="flex justify-center gap-4">
      {!token && (
        <>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Login
          </Link>
        </>
      )}
      {role === "employer" && (
        <Link
          to="/dashboard/employer"
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          Post a Job
        </Link>
      )}
    </div>
    </div>
  </div>
</section>


      <JobCategories />

      {/* Job Listings */}
      <section className="py-12 px-6">
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
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 text-center">
  {/* Heading */}
  <h2 className="text-2xl font-bold mb-8">How It Works</h2>

  {/* Grid (Job Seeker & Employer) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {/* Job Seekers Card */}
    <div className="card bg-base-100 border border-gray-200 hover:border-green-500 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="card-body flex flex-col items-center text-center space-y-3">
        <span className="text-3xl text-green-500">👤</span>
        <h3 className="card-title text-lg font-bold">For Job Seekers</h3>
        <p className="text-gray-600">
          Create a profile, upload your resume, and apply to verified jobs easily.
        </p>
      </div>
    </div>

    {/* Employers Card */}
    <div className="card bg-base-100 border border-gray-200 hover:border-green-500 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="card-body flex flex-col items-center text-center space-y-3">
        <span className="text-3xl text-green-500">🏢</span>
        <h3 className="card-title text-lg font-bold">For Employers</h3>
        <p className="text-gray-600">
          Post job listings, review applicants, and manage your company profile.
        </p>
      </div>
    </div>
  </div>
</section>



<Footer/>
    </div>
  );
};

export default Home;
