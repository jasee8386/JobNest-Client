import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobListings from "../components/JobListings";
import JobCategories from "../components/JobCategories";
import jobimg from "../assets/jobimg.png";
import jobseeker from "../assets/jobseeker.jpg"
import employer from "../assets/employer.jpg"
import { Search, MapPin } from "lucide-react";
const Home = () => {
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
  const theme = useSelector((state) => state.theme.value);
  //Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (title.trim()) query.append("title", title);
    if (location.trim()) query.append("location", location);

    navigate(`/jobs?${query.toString()}`);
  };
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

 
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
      <Hero/>
      <JobCategories />
<JobListings/>
      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 text-center">
               <h2 className="text-2xl font-bold mb-8">How It Works</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Job Seekers Card */}
         <div
  className="relative card bg-cover bg-center border border-gray-200 hover:border-green-500 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
  style={{
    backgroundImage: `url(${jobseeker})`, 
  }}
>
 
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="card-body flex flex-col items-center text-center space-y-3 relative z-10 text-blue">
   
    <h3 className="card-title text-lg font-bold">For Job Seekers</h3>
    <p className="text-blue-600">
      Create a profile, upload your resume, and apply to verified jobs easily.
    </p>
  </div>
</div>


          {/* Employers Card */}
          <div
  className="relative card bg-cover bg-center border border-gray-200 hover:border-green-500 shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
  style={{
    backgroundImage: `url(${employer})`, 
  }}
>
 
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="card-body flex flex-col items-center text-center space-y-3 relative z-10 text-blue">
   
    <h3 className="card-title text-lg font-bold">For Employers</h3>
    <p className="text-blue-600">
       Post job listings, review applicants, and manage your company
                profile.
    </p>
  </div>
</div>

        
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
