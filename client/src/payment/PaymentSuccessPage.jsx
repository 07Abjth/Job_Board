import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import React from 'react';

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!sessionId) {
        setError("No session ID found");
        navigate('/user/subscription');
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/payment/session-status/${sessionId}`);
        console.log("API Response:", response.data);
        if (response.data.success) {
          setDetails(response.data.sessionDetails);
        } else {
          setError("Failed to fetch payment details");
          navigate('/user/subscription');
        }
const statusCheck = await axiosInstance.get('/subscription/check-status')
console.log("status-check ====", statusCheck);


      } catch (err) {
        console.error("Error fetching session details:", err);
        setError(err.message || "Failed to fetch payment details");
        navigate('/user/subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();

    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="flex items-center space-x-4">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-lg text-gray-700 font-medium">Fetching payment confirmation...</p>
        </div>
      </div>
    );
  }



  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
        <div className="card w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-red-200">
          <div className="card-body items-center text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-2">❌ Payment Verification Failed</h2>
            <p className="text-gray-700">{error}</p>
            <div className="card-actions mt-6">
              <button
                onClick={() => navigate('/user/subscription')}
                className="btn btn-outline btn-error px-6 py-2 rounded-xl"
              >
                Back to Subscriptions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatAmount = (value) => {
    if (value === undefined || value === null) return '0.00';
    if (typeof value === 'number') return value.toFixed(2);
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) return parsed.toFixed(2);
    return '0.00';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <div className="card-body items-center text-center space-y-4">
          <h2 className="text-4xl font-bold text-green-600 mb-2">🎉 Subscription Successful!</h2>
          <p className="text-gray-700 text-lg">Thank you for upgrading to premium! You’ll be redirected shortly.</p>

          <div className="w-full text-left space-y-2 text-gray-800 text-base">
            <p><strong>💼 Plan:</strong> {details?.subscriptionPlan || 'Premium Plan'}</p>
            <p><strong>💰 Amount Paid:</strong> ₹{formatAmount(details?.subscriptionAmount || details?.amount)}</p>
            <p><strong>📧 Email:</strong> {details?.customerEmail || 'Not available'}</p>
          </div>

          <div className="card-actions mt-6">
            <button
              onClick={() => navigate('/')}
              className="btn bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-xl shadow-md"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
