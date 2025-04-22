import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ErrorPage = ({role = "user"}) => {
  
  
  const url = {
    home:"/",
  }

  if (role == "employer"){
    url.home = "/employer/dashboard"
  }
  
const navigate = useNavigate()

  return ( 
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <h2 onClick={()=> navigate(url.home)}>Go to Home</h2>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        
      </Link>
    </div>
  );
};
