import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Hero = () => {
  const [search, setSearch] = useState(""); 
  const [title, setTitle] = useState(""); 
  const [location, setLocation] = useState("");  
  const navigate = useNavigate();

  // Get token & role (for conditional buttons)
  const token = localStorage.getItem("token");
  let role = null;
  if (token) {
    try {
      const { role: userRole } = JSON.parse(atob(token.split(".")[1])); // decode role safely
      role = userRole;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (search.trim()) query.append("search", search);
    if (title.trim()) query.append("title", title);
    if (location.trim()) query.append("location", location);
    navigate(`/jobs?${query.toString()}`);
  };

  return (
    <div>
     <section
  className="h-[70vh] md:h-[60vh] bg-cover bg-center relative"
  style={{ backgroundImage: `url(${assets.jobimg})` }}
>
  <div className="absolute inset-0 bg-black/30"></div>

  <div className="text-center relative z-10 flex flex-col items-center gap-3">
    <div className="max-w-2xl">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 text-center">
        Launch Your Career Today
      </h1>
      <p className="mb-4 text-base md:text-lg text-gray-800">
        Explore thousands of jobs and take the next step toward your dream career
      </p>

      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden mb-6"
      >
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-800 outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2">
          Search
        </button>
      </form>
    </div>
  </div>
</section>


      <div className="border border-gray shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted By</p>
          <img className='h-6'src={assets.apple} alt="" />
          <img className='h-6'src={assets.Accenture} alt="" />
          <img className='h-6'src={assets.Amazon} alt="" />
          <img className='h-6'src={assets.Google} alt="" />
          <img className='h-6'src={assets.Meta} alt="" />
          <img className='h-6'src={assets.Microsoft} alt="" />
          <img className='h-6'src={assets.ibm} alt="" />
          <img className='h-6'src={assets.samsung} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
