import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import logo from "../../assets/TH-logo.png";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Talent Hiring Logo" className="h-16 w-16" />
          <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 -ml-4">
            Talent Hiring
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/" className="hover:text-blue-400 transition">Saved Jobs</Link>
           <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </nav>

        {/*   DarkMode → Login/Signup → Avatar */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* DarkMode Toggle */}
          <DarkMode />

          {/* Login & Sign Up */}
          <Link
            to="/login"
            className="px-3 py-1.5 border border-blue-400 rounded text-sm hover:bg-blue-400 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1.5 bg-blue-400 text-white rounded text-sm hover:bg-blue-500 transition"
          >
            Sign Up
          </Link>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  alt="User Avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a>Profile</a></li>
              <li><a>Saved Jobs</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
