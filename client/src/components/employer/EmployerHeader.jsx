import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode"; // Assuming DarkMode toggle is shared

export const EmployerHeader = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Branding */}
        <Link to="/employer/dashboard" className="text-2xl font-bold">
          Employer Portal
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/employer/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/employer/job-management" className="hover:text-gray-200">
            Manage Jobs
          </Link>
          <Link to="/employer/candidates" className="hover:text-gray-200">
            Candidates
          </Link>
          <Link to="/employer/profile" className="hover:text-gray-200">
            Profile
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <DarkMode />

        {/* Logout Button */}
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};
