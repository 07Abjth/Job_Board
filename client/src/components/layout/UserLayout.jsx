import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../user/UserHeader";
import { Footer } from "../user/Footer";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { PublicHeader } from "../public/PublicHeader";

export const UserLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location.pathname, "====pathName");

  const checkUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check-user", {
        withCredentials: true,
      });
      dispatch(saveUserData(response.data));
      console.log(response, "========== checkUser response");
    } catch (error) {
      dispatch(clearUserData());
      console.log(error, "=========== checkUser error");
    }
  };

  useEffect(() => {
    const publicRoutes = ["/", "/login", "/register", "/about"];

    if (!publicRoutes.includes(location.pathname)) {
      checkUser();
    }
  }, [location.pathname]);

  console.log(isUserAuth, "isUserAuth");
  console.log(userData, "userData");

  return (
    <div>
      {/* Conditional Header */}
      {isUserAuth ? <UserHeader /> : <PublicHeader />}

      {/* Main Content */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
