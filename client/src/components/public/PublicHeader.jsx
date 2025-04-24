import React from "react";
import { Link } from "react-router-dom";

export const PublicHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Talent Hiring
      </Link>
      <nav className="space-x-4">
      <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
      </nav>
    </header>
  );
};
