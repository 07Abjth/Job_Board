import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
 import { UserHeader } from "../user/UserHeader";
import { Footer } from "../user/Footer";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { PublicHeader } from "../public/PublicHeader"; // Adjust the import path as necessary

export const UserLayout = () => {
  // ✅ Correct use of useSelector
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname, "====pathName");
  

  //  Async function to check user authentication
  const checkUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check-user", {
        withCredentials: true, // ✅ Ensure cookies are sent
      });
      dispatch(saveUserData(response.data));
      console.log(response, "========== checkUser response");
    } catch (error) {
      dispatch(clearUserData());
      console.log(error, "=========== checkUser error");
    }
  };
  

  // ✅ Use useEffect correctly
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  console.log(isUserAuth, "isUserAuth");
  console.log(userData, "userData");

  return (
    <div>
      {/* Show the correct header based on login state */}
      {isUserAuth ? <UserHeader /> : <PublicHeader />}

      {/* Main content */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
