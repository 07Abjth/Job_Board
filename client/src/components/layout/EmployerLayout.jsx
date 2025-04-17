import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { EmployerHeader } from "../employer/EmployerHeader"; // Employer Header
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearEmployerData, saveEmployerData } from "../../redux/features/employerSlice"; // Redux slices for employer data
import { EmployerFooter } from "../employer/EmployerFooter"; // Employer Footer
import { SideBar } from "../employer/SideBar"; // Employer Sidebar

export const EmployerLayout = () => {
  const { isEmployerAuth, employerData } = useSelector((state) => state.employer); // Get data from the redux store
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname, "==== Employer pathName");

  // ✅ Check employer authentication
  const checkEmployer = async () => {
    try {
      const response = await axiosInstance.post("/employer/check-employer", {
        withCredentials: true, // Ensure cookies are sent
      });
      dispatch(saveEmployerData(response.data)); // Save employer data to Redux store
      console.log(response, "========== checkEmployer response");
    } catch (error) {
      dispatch(clearEmployerData()); // Clear employer data if authentication fails
      console.log(error, "=========== checkEmployer error");
    }
  };

  useEffect(() => {
    checkEmployer(); // Check employer auth when path changes
  }, [location.pathname]);

  console.log(isEmployerAuth, "isEmployerAuth");
  console.log(employerData, "employerData");

  return (
    <div className="flex flex-row">
      <div className="w-2/12 shadow-lg">
        <SideBar /> {/* Sidebar for employer with options like manage jobs, profile, etc. */}
      </div>

      <div className="w-full">
        <EmployerHeader /> {/* Header with navigation for employer */}

        {/* Main content */}
        <div className="p-4">
          <Outlet /> {/* Render nested routes here */}
        </div>

        {/* Footer */}
        <EmployerFooter /> {/* Footer for employer */}
      </div>
    </div>
  );
};
