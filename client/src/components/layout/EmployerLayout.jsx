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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-2/12 min-h-screen">
          <SideBar />
        </aside>
      )}

      {/* Content */}
      <div className={`${showSidebar ? "w-10/12" : "w-full"} flex flex-col`}>
        {/* Header */}
        {showSidebar ? <EmployerHeader /> : <PublicHeader />}

        {/* Main content */}
        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>

        {/* Footer */}
        <EmployerFooter />
      </div>
    </div>
  );
};
