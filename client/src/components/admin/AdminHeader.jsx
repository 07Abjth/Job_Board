import React from "react";
import { DarkMode } from "../shared/DarkMode"; // if you have a dark mode component
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      toast.success("Logged out successfully");
      navigate("/admin/login");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={handleLogout} className="btn btn-error btn-sm text-white">Logout</button></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Admin Panel</a>
      </div>
      <div className="navbar-end">
        <DarkMode />
      </div>
    </div>
  );
};
