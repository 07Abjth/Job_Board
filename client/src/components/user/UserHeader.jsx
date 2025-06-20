import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import logo from "../../assets/TH-logo.png";
import premiumIcon from "../../assets/premium-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/features/userSlice";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { UserProfileImage } from "../../pages/user/cards/UserProfileImage";
import { useSubscription } from "../../hooks/useSubscription";

export const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserAuth } = useSelector((state) => state.user);

  const { isSubscribed, checkingSubscription } = useSubscription();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");

      localStorage.removeItem("userToken"); // Clear user token
      localStorage.removeItem("theme"); // Clear theme preference

      document.documentElement.setAttribute("data-theme", "light"); // Reset theme immediately

      dispatch(clearUserData()); // Clear user data from state

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-base-100 text-base-content shadow-md">
      <div className="bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          {/* Logo + Premium Icon */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={logo}
              alt="Talent Hiring Logo"
              className="h-12 w-12 md:h-14 md:w-14"
            />
            <span className="text-xl md:text-2xl font-bold text-primary -ml-2 flex items-center gap-1">
              Talent Hiring
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-sm md:text-base font-medium">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link
              to="/user/saved-job"
              className="hover:text-primary transition"
            >
              Saved Jobs
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <DarkMode />
            <section>
              {isSubscribed && !checkingSubscription && (
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-sm text-gray-600">Premium User</span>
                  <img
                    src={premiumIcon}
                    alt="Premium"
                    className="h-5 w-5 md:h-6 md:w-6"
                  />
                </div>
              )}
            </section>
            {isUserAuth && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <UserProfileImage />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 text-sm rounded-xl w-52 space-y-1"
                >
                  <li>
                    <button
                      onClick={(e) => {
                        e.currentTarget.tabIndex = -1;
                        e.currentTarget.blur(); // remove focus, closes dropdown
                        navigate("/user/profile");
                      }}
                      className="w-full text-left hover:bg-base-200 rounded-md px-2 py-1"
                    >
                      👤 Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        e.currentTarget.tabIndex = -1;
                        e.currentTarget.blur();
                        navigate("/user/saved-job");
                      }}
                      className="w-full text-left hover:bg-base-200 rounded-md px-2 py-1"
                    >
                      💾 Saved Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        e.currentTarget.tabIndex = -1;
                        e.currentTarget.blur();
                        navigate("/user/settings");
                      }}
                      className="w-full text-left hover:bg-base-200 rounded-md px-2 py-1"
                    >
                      ⚙️ Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        e.currentTarget.tabIndex = -1;
                        e.currentTarget.blur();
                        navigate("/user/applied-jobs");
                      }}
                      className="w-full text-left hover:bg-base-200 rounded-md px-2 py-1"
                    >
                      📋 Applied Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left hover:bg-error/10 text-error rounded-md px-2 py-1"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
