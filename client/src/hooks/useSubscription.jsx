// src/hooks/useSubscription.jsx
import { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const res = await axiosInstance.get('/subscription/check-status', {
          withCredentials: true,
        });
        setIsSubscribed(res.data.isSubscribed);
      } catch (error) {
        console.error("Subscription check failed:", error);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, []);

  return { isSubscribed, loading };
};
