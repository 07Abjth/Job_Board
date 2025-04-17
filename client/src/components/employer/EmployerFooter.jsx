import React from "react";

export const EmployerFooter = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-6 mt-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
        <nav className="flex space-x-6">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/terms" className="hover:underline">Terms</a>
        </nav>
        
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-gray-400">© 2025 Employer Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};
