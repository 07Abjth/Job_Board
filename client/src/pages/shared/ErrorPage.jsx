// pages/ErrorPage.jsx
import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      {error?.statusText && (
        <p className="text-gray-600 mb-4">{error.statusText}</p>
      )}
      <Link
        to="/"
        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

 