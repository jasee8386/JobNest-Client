import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const About = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
     <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-800 text-center">
          About JobNest
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-6">
          Welcome to <span className="font-semibold">JobNest</span>, your trusted
          job board platform. We connect talented job seekers with verified
          employers, ensuring safe and meaningful career opportunities.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="font-bold text-xl mb-2 text-secondary">Our Mission</h2>
            <p className="text-gray-600">
              To make hiring simple, transparent, and efficient for everyone.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="font-bold text-xl mb-2 text-secondary">Our Vision</h2>
            <p className="text-gray-600">
              Building the most reliable career platform for seekers & employers.
            </p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="font-bold text-xl mb-2 text-secondary">Our Values</h2>
            <p className="text-gray-600">
              Integrity, trust, and innovation in every step of recruitment.
            </p>
          </div>
        </div>
      </div>
    </div>
      
<Footer/>
    </div>
  );
};

export default About;
