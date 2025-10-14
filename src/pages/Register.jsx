import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker", // default role
  });
 const theme = useSelector((state) => state.theme.value);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    axios
      .post(`${backendBaseUrl}/user/register`, data)
      .then((res) => {
        console.log(res.data);
        setSuccess("Registered successfully! Please login.");
        setError("");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response?.data?.message || "Something went wrong");
        setSuccess("");
      });
  };

  const changeHandler = (event) => {
    const tempData = { ...data };
    tempData[event.target.name] = event.target.value;
    setData(tempData);
    setError("");
    setSuccess("");
  };

  return (
      <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
          
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-6 space-y-4 bg-white shadow-xl rounded-2xl"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <p className="text-center text-gray-500">Create a new account</p>

        {/* Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Full Name"
            onChange={changeHandler}
            className="input input-bordered w-full"
            autoComplete="off"
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email ID</legend>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email ID"
            onChange={changeHandler}
            className="input input-bordered w-full"
            autoComplete="off"
          />
        </fieldset>

        {/* Password */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={changeHandler}
            className="input input-bordered w-full"
            autoComplete="new-password"
          />
        </fieldset>

        {/* Role (Dropdown) */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Role</legend>
          <select
            name="role"
            value={data.role}
            onChange={changeHandler}
            className="select select-bordered w-full"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </fieldset>

        {/* Error / Success messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Submit Button */}
        <button className="btn btn-primary w-full" type="submit">
          Register
        </button>

        {/* Extra Links */}
        <div className="text-sm text-center text-gray-500 mt-2">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
    
<Footer/>
    </div>
  );
};

export default Register;
