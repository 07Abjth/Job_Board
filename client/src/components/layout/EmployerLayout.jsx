import React, { useEffect } from "react";
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

  const { isEmployerAuth, employerData } = useSelector((state) => state.employer);

  console.log(location.pathname, "==== Employer pathName");

  const checkEmployer = async () => {
    try {
      const response = await axiosInstance.post("/employer/check-employer", {}, {
        withCredentials: true,  
      });
      console.log(response, "========== checkEmployer response");
      if (response.status !== 200) {
        throw new Error("Unauthorized access");
      }
      
      dispatch(saveEmployerData(response.data));
      console.log(response, "========== checkEmployer response");
    } catch (error) {
      dispatch(clearEmployerData());
      console.log(error, "=========== checkEmployer error");
      navigate("/employer/login"); // redirect if unauthorized
    }
  };

  useEffect(() => {
    checkEmployer();
  }, [location.pathname]);

  console.log(isEmployerAuth, "'isEmployerAuth'");
  console.log(employerData, "'employerData'");

  return (
    <div className="flex flex-row justify-between min-h-dvh">
      {isEmployerAuth && (
        <div className="w-2/12">
          <SideBar />
        </div>
      )}
  
      <div className={`${isEmployerAuth ? "w-10/12" : "w-full"} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
        {/* Header based on auth */}
        {isEmployerAuth ? <EmployerHeader /> : <PublicHeader />}
  
        {/* Main content */}
        <div className="min-h-96">
          <Outlet />
        </div>
  
        {/* Footer */}
        <EmployerFooter />
      </div>
    </div>
  );
}  