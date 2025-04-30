import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export const ProtectedRoutesAdmin = () => {
  const [isAdminAuth, setIsAdminAuth] = useState(null); // null for loading state

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance.post("/admin/check-admin", {}, { withCredentials: true });
      if (response.status === 200) {
        setIsAdminAuth(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsAdminAuth(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (isAdminAuth === null) {
    // Loading Spinner here
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return isAdminAuth ? <Outlet /> : <Navigate to="/login" />;
};
