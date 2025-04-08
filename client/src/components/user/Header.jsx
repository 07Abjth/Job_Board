import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          YourCompany
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/course-page" className="hover:text-blue-400 transition">Courses</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </nav>

        {/* Buttons (Login/Sign Up) + DarkMode */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 border border-blue-400 rounded hover:bg-blue-400 hover:text-gray-900 transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-400 text-gray-900 rounded hover:bg-blue-500 transition">
            Sign Up
          </Link>

          {/* Dark Mode Toggle */}
          <DarkMode />
        </div>
      </div>
    </header>
  );
};
