import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRoutesEmployer = () => {
  const { isEmployerAuth } = useSelector((state) => state.employer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmployerAuth) {
      navigate("/employer/login");
    }
  }, [isEmployerAuth, navigate]);

  // Optional: You can show a loading or blank screen while checking
  if (!isEmployerAuth) return null;

  return <Outlet />;
};
