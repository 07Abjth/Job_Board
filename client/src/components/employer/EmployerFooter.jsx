import React from "react";
import { Link } from "react-router-dom";

export const EmployerFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-6">
        
        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          <Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link>
          <Link to="/terms" className="hover:text-blue-400 transition">Terms</Link>
        </nav>

        

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center">
          © 2025 <span className="text-white font-semibold">Employer Platform</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
