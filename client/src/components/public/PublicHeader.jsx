import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/TH-logo.png'; 


export const PublicHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
             <Link to="/" className="flex items-center space-x-2">
               <img src={logo} alt="Talent Hiring Logo" className="h-16 w-16" />
               <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 -ml-4">
                 Talent Hiring
               </span>
             </Link>
      <nav className="space-x-4">
      <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
      </nav>
    </header>
  );
};
