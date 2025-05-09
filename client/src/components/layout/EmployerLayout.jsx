import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { saveEmployerData, clearEmployerData } from "../../redux/features/employerSlice";
import { EmployerHeader } from "../employer/EmployerHeader";
import { PublicHeader } from "../public/PublicHeader";
import { SideBar } from "../employer/SideBar";
import { EmployerFooter } from "../employer/EmployerFooter";

export const EmployerLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isEmployerAuth } = useSelector((state) => state.employer);
  const [loading, setLoading] = useState(true);

  const isPublicRoute = ["/employer/login", "/employer/signup"].includes(location.pathname);

  const checkEmployer = async () => {
    try {
      const response = await axiosInstance.post(
        "/employer/check-employer",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(saveEmployerData(response.data));
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      dispatch(clearEmployerData());
      navigate("/employer/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPublicRoute) {
      setLoading(false);
    } else if (!isEmployerAuth) {
      checkEmployer();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading…</span>
      </div>
    );
  }

  const showSidebar = isEmployerAuth && !isPublicRoute;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      {showSidebar ? <EmployerHeader /> : <PublicHeader />}

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
            <SideBar />
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4">
          <main className="min-h-[calc(100vh-4rem)]">
            <Outlet />
          </main>

          <EmployerFooter />
        </div>
      </div>
    </div>
  );
};
