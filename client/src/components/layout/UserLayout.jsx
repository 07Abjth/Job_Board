import React, { useEffect } from "react";
import { Outlet} from "react-router-dom";
 import { UserHeader } from "../user/UserHeader";
import { Footer } from "../user/Footer";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { PublicHeader } from "../public/PublicHeader"; // Adjust the import path as necessary

export const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check-user", {
        withCredentials: true,
      });
      dispatch(saveUserData(response.data));
    } catch (error) {
      dispatch(clearUserData());
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {isUserAuth ? <UserHeader /> : <PublicHeader />}
  
      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>
  
      {/* Footer */}
      <Footer />
    </div>
  );
}
  