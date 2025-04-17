import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const PublicHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          My App
        </Link>

        {/* Navigation (Public) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-400 transition">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};