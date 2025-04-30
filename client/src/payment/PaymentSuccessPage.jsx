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
    if (!sessionId) {
      setError("No session ID found");
      navigate('/user/subscription');
      return;
    }
    
    setLoading(true);
    
    axiosInstance.get(`/payment/session-status/${sessionId}`)
      .then(response => {
        console.log("API Response:", response.data);
        if (response.data.success) {
          setDetails(response.data.sessionDetails);
        } else {
          setError("Failed to fetch payment details");
          navigate('/user/subscription');
        }
      })
      .catch(err => {
        console.error("Error fetching session details:", err);
        setError(err.message || "Failed to fetch payment details");
        navigate('/user/subscription');
      })
      .finally(() => {
        setLoading(false);
      });
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [sessionId, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="ml-4 text-lg text-base-content">Fetching payment confirmation...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-xl bg-base-100 shadow-2xl p-6">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error text-2xl">Payment Verification Failed</h2>
            <p className="text-base-content">{error}</p>
            <div className="card-actions mt-4">
              <button
                onClick={() => navigate('/user/subscription')}
                className="btn btn-outline btn-primary"
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl p-8">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-success text-3xl mb-4">🎉 Subscription Successful!</h2>
          <p className="text-base-content mb-6">
            Thank you for upgrading to premium! You’ll be redirected shortly.
          </p>

          <div className="w-full text-left space-y-2 text-base-content">
            <p><strong>💼 Plan:</strong> {details?.subscriptionPlan || 'Premium Plan'}</p>
            <p><strong>💰 Amount Paid:</strong> ₹{formatAmount(details?.subscriptionAmount || details?.amount)}</p>
            <p><strong>📧 Email:</strong> {details?.customerEmail || 'Not available'}</p>
          </div>

          <div className="card-actions mt-6">
            <button
              onClick={() => navigate('/')}
              className="btn btn-success"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
