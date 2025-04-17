import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../shared/DarkMode';
import logo from '../../assets/TH-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../redux/features/userSlice';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isUserAuth } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout"); //   API Call
      localStorage.removeItem("userToken"); // Remove token
      navigate("/"); 
      console.log("Logout successful");
      dispatch(clearUserData()); // Clear user data from Redux store
      
      toast.success("Logged out successfully"); // Notify the user

      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Talent Hiring Logo" className="h-16 w-16" />
          <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 -ml-4">
            Talent Hiring
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/user/saved-job" className="hover:text-blue-400 transition">
            Saved Jobs
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Dark Mode Toggle */}
          <DarkMode />

          {isUserAuth && (
            // Authenticated user view
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={userData?.avatar || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}
                    alt="User Avatar"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><Link to="/user/user-profile">Profile</Link></li>
                <li><Link to="/user/saved-job">Saved Jobs</Link></li>
                <li><Link to="/user/settings">Settings</Link></li>
                <li><Link to="/user/applied-jobs">Applied Jobs</Link></li>
                <li><Link to="/user/settings">Settings</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
