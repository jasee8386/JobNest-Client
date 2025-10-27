import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";

const NotFound = () => {
  const theme = useSelector((state) => state.theme.value);

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center px-6"
    >
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-800 mb-6 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-700 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 rounded-lg text-white hover:bg-green-600 transition"
        >
          Go Back Home
        </Link>
      </div>

      {/* Optional: fun illustration */}
      <img
        src={assets.notfound}
        alt="404 Illustration"
        className="mt-10 w-full max-w-md mx-auto"
      />
    </div>
  );
};

export default NotFound;
