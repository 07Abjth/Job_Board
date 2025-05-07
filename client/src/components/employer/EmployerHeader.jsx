import React from "react";
import { DarkMode } from "../shared/DarkMode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearEmployerData } from "../../redux/features/employerSlice";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const EmployerHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmployerLogout = async () => {
    try {
      await axiosInstance.delete("/employer/logout", { withCredentials: true });
      dispatch(clearEmployerData());
      toast.success("Logged out successfully");
      navigate("/employer/login");
    } catch (error) {
      console.error("Employer logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <button onClick={handleEmployerLogout}
                      className="btn btn-sm btn-error text-white w-full text-left">
                Logout
              </button>
            </li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Talent Hiring</a>
      </div>

      <div className="navbar-end flex items-center space-x-2">
        <button className="btn btn-ghost btn-circle">
          {/* search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <DarkMode />

        <button className="btn btn-ghost btn-circle">
          {/* notifications icon */}
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                       6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165
                       6 8.388 6 11v3.159c0 .538-.214 1.055-.595
                       1.436L4 17h5m6 0v1a3 3 0
                       11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};
