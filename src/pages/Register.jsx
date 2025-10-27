import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { FcGoogle } from "react-icons/fc";
import { assets } from "../assets/assets";

const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const Register = () => {
  const theme = useSelector((state) => state.theme.value);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendBaseUrl}/user/register`, data);
      setSuccess("Registered successfully! Please login.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${backendBaseUrl}/auth/google`;
  };

  return (
   
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl">
          {/* Optional left image */}
          <div className="hidden lg:flex lg:w-1/2">
            <img
              src={assets.login}
              alt="Register Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Create Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Join our platform to kickstart your career
            </p>

            <form onSubmit={submitHandler} className="space-y-4" autoComplete="off">
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={changeHandler}
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={changeHandler}
                placeholder="Email ID"
                className="input input-bordered w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={changeHandler}
                placeholder="Password"
                className="input input-bordered w-full"
                autoComplete="new-password"
                required
              />
              <select
                name="role"
                value={data.role}
                onChange={changeHandler}
                className="select select-bordered w-full"
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}

              <button type="submit" className="btn btn-primary w-full mt-2">
                Register
              </button>
            </form>

            {/* OR separator */}
            <div className="divider text-gray-500 my-4">OR</div>

            {/* Sign in with Google */}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>

            <div className="text-center text-sm mt-4 text-gray-500">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

  
  );
};

export default Register;
