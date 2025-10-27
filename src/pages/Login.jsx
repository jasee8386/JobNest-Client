import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode"; // Correct import for ESM/Vite
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import login from "../assets/login.jpg";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const Login = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode.default(token); // use .default with import * as
        const role = decoded.role;
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "employer") navigate("/dashboard/employer");
        else navigate("/dashboard/jobseeker");
      } catch {
        console.log("Invalid token, please login again");
      }
    }
  }, [navigate]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backendBaseUrl}/user/login`, data);
    localStorage.setItem("token", res.data.token);

    const role = res.data.user.role;
    const from = location.state?.from?.pathname;

    if (from) navigate(from, { replace: true });
    else if (role === "admin") navigate("/dashboard/admin");
    else if (role === "employer") navigate("/dashboard/employer");
    else navigate("/dashboard/jobseeker");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${backendBaseUrl}/auth/google`;
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">


     <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl">
          {/* Optional left image */}
          <div className="hidden lg:flex lg:w-1/2">
            <img
              src={assets.login}
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
         
          </div>

          {/* Login Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Login to continue your career journey
            </p>

            <form onSubmit={submitHandler} autoComplete="off" className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text text-gray-400">Email ID</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-gray-400">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  autoComplete="new-password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button type="submit" className="btn btn-primary w-full mt-2">
                Login
              </button>
            </form>

            {/* OR separator */}
            <div className="divider text-gray-400 my-4">OR</div>

            {/* Google Sign-In */}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>

            <div className="text-center text-sm mt-4 text-gray-400">
              <p>
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-400 hover:underline">
                  Register
                </Link>
              </p>
              <p className="mt-1">
                <Link to="/forgot-password" className="text-blue-400 hover:underline">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
