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

  // pull auth flag from redux
  const { isEmployerAuth } = useSelector((state) => state.employer);

  // local loading flag while we check /employer/check-employer
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
    // if it's a public route, skip the check and stop loading
    if (isPublicRoute) {
      setLoading(false);
    } else if (!isEmployerAuth) {
      checkEmployer();
    } else {
      // already authenticated
      setLoading(false);
    }
  }, [location.pathname]);

  // while we're checking auth (and not on login/signup), show nothing or a spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* only show sidebar on non-public routes when authenticated */}
      {isEmployerAuth && !isPublicRoute && (
        <div className="w-2/12">
          <SideBar />
        </div>
      )}

      <div className={`${isEmployerAuth && !isPublicRoute ? "w-10/12" : "w-full"} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
        {/* choose header based on auth */}
        {isEmployerAuth && !isPublicRoute ? <EmployerHeader /> : <PublicHeader />}

        <main className="flex-1">
        <Outlet />
</main>


        <EmployerFooter />
      </div>
    </div>
  );
};
