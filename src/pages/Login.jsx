import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import login from "../assets/login.jpg"; 

const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const Login = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
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
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "employer") navigate("/dashboard/employer");
      else navigate("/dashboard/jobseeker");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 justify-center items-center p-6">
          <img
            src={login}
            alt="Job Portal Illustration"
            className="w-3/4 max-w-md"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Login to continue your career journey
            </p>

            <form onSubmit={submitHandler} autoComplete="off" className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="btn btn-success w-full text-white mt-2"
              >
                Login
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                <p>
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                  </Link>
                </p>
                <p className="mt-1">
                  <Link to="/forgot-password" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
