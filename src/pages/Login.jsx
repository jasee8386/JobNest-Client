import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
const backendBaseUrl = import.meta.env.VITE_BACKEND_API;
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode.default(token);
        const role = decoded.role;
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "employer") navigate("/dashboard/employer");
        else navigate("/dashboard/jobseeker");
      } catch (err) {
        console.log("Invalid token, please login again");
      }
    }
  }, [navigate]);
 const theme = useSelector((state) => state.theme.value);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
    axios
      .post(`${backendBaseUrl}/user/login`, data)
      .then((res) => {
        console.log(res.data);
            localStorage.setItem("token", res.data.token);
        const role = res.data.user.role;
        if (role === "admin") navigate("/dashboard/admin");
        else if (role === "employer") navigate("/dashboard/employer");
        else navigate("/dashboard/jobseeker");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
      });
  };
  const changeHandler = (event) => {
    const tempData = { ...data };
    tempData[event.target.name] = event.target.value;
    setData(tempData);
    setError("");
  };
  return (
      <div data-theme={theme} className="min-h-screen bg-base-100">
      <Header />
          
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-6 space-y-4 bg-white shadow-xl rounded-2xl"
          autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-500">
          Enter your details to continue
        </p>

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
          <p className="label text-red-500 text-sm">{error}</p>
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
          <p className="label text-red-500 text-sm">{error}</p>
        </fieldset>

        {/* Submit Button */}
        <button className="btn btn-success w-full" type="submit">
          Login
        </button>

        {/* Extra Links */}
        <div className="text-sm text-center text-gray-500 mt-2">
          <p>
           Don’t have an account?{" "}
  <Link to="/register" className="text-blue-500 hover:underline">
    Register
  </Link>  
          </p>
          <p>
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </div>
    
<Footer/>
    </div>
  );
};

export default Login;
