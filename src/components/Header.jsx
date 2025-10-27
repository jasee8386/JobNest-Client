import React , { useState } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate  } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo  from "../assets/logo.png"
import { useAuth } from "../context/AuthContext";
//import "./styles/global.css";
const Header = () => {

const navigate = useNavigate();


 const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          ><li>
              <Link to="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link  to="/about">About Us</Link>
            </li>
            <li>
              <Link  to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl">
        <img src={logo} alt="JobNest Logo" className="w-8 h-8" /> <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide">
            </span>
JobNest</Link>
      </div>
    <div className="navbar-center hidden lg:flex">
 
    <ul className="menu menu-horizontal px-1">
      <li>
              <Link to="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link  to="/about">About Us</Link>
            </li>
            <li>
              <Link  to="/contact">Contact Us</Link>
            </li>
    </ul>
  
</div>

      <div className="navbar-end gap-4">
         <ThemeToggle />
                        <div className="flex-none">
          <div className="dropdown dropdown-end mr-3">
            {isAuthenticated ? (
              <>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
               <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
>
  <li>
    <Link to="/profile" className="justify-between">
      Profile
      <span className="badge">New</span>
    </Link>
  </li>
  <li>
    <Link to="/settings">Settings</Link>
  </li>
  <li>
    <Link to="/login" onClick={() => localStorage.removeItem("token")}>
      Logout
    </Link>
  </li>
</ul>

              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
