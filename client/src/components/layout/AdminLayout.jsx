import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { AdminHeader } from "../admin/AdminHeader";
import { AdminSidebar } from "../admin/AdminSidebar"; 

export const AdminLayout = () => {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance.post("/admin/check-admin", {}, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAdminAuth(true);
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      setIsAdminAuth(false);
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar will always be visible */}
      <div className="w-2/12">
        <AdminSidebar />
      </div>

      <div className="w-10/12 bg-gray-100 dark:bg-gray-900 flex flex-col">
        {/* AdminHeader only if authenticated */}
        {isAdminAuth && <AdminHeader />}

        <div className="p-4 flex-1">
          {/* Outlet for nested routes */}
          {isAdminAuth ? <Outlet /> : null}
        </div>
      </div>
    </div>
  );
};
