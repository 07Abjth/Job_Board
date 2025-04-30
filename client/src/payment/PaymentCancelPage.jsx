import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const PaymentCancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Canceled</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment was canceled. You will be redirected shortly.
        </p>
        <button
          onClick={() => navigate('/user/user-homepage')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
