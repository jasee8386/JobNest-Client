import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Contact = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
     <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-800 text-center">
        Contact Us
      </h1>
      <p className="mb-10 text-lg md:text-xl text-gray-600 text-center max-w-xl">
        Have questions or need help? Reach out to us! We are here to assist you
        and answer all your queries.
      </p>

      <form className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
        />
        <textarea
          placeholder="Your Message"
          className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white text-lg font-semibold transition-all duration-300 shadow-lg"
        >
          Send Message
        </button>
      </form>
    </div>
      
<Footer/>
    </div>
  );
};

export default Contact;
