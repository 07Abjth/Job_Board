import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "../admin/AdminHeader";
import { AdminSidebar } from "../admin/AdminSidebar";

export const AdminLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  return (
    <div className="flex min-h-screen">
      {/* Only show sidebar if not on login page */}
      {!isLoginPage && (
        <div className="w-2/12">
          <AdminSidebar />
        </div>
      )}

      <div className={`${isLoginPage ? 'w-full' : 'w-10/12'} bg-gray-100 dark:bg-gray-900 flex flex-col`}>
        {/* AdminHeader only if not on login page */}
        {!isLoginPage && <AdminHeader />}

        <div className="p-4 flex-1">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};