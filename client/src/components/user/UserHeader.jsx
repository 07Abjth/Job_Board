import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { DarkMode } from '../shared/DarkMode'; 
import logo from '../../assets/TH-logo.png'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { clearUserData } from '../../redux/features/userSlice'; 
import { axiosInstance } from '../../config/axiosInstance'; 
import toast from 'react-hot-toast';
import { UserProfileImage } from '../../pages/user/cards/UserProfileImage';  

export const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserAuth } = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      localStorage.removeItem("userToken");
      dispatch(clearUserData());
      toast.success("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
     <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
    
    {/* Logo */}
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
      <img src={logo} alt="Talent Hiring Logo" className="h-12 w-12 md:h-14 md:w-14" />
      <span className="text-xl md:text-2xl font-bold text-blue-500 dark:text-blue-400 -ml-2">
        Talent Hiring
      </span>
    </Link>

    {/* Navigation (centered using absolute and transform) */}
    <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-sm md:text-base font-medium">
      <Link to="/" className="hover:text-blue-500 transition">Home</Link>
      <Link to="/about" className="hover:text-blue-500 transition">About</Link>
      <Link to="/user/saved-job" className="hover:text-blue-500 transition">Saved Jobs</Link>
      <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
    </nav>

    {/* Right Section */}
    <div className="flex items-center space-x-2 md:space-x-4">
      <DarkMode />

      {isUserAuth && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <UserProfileImage />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/user/saved-job">Saved Jobs</Link></li>
            <li><Link to="/user/settings">Settings</Link></li>
            <li><Link to="/user/applied-jobs">Applied Jobs</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      )}
    </div>
  </div>
</div>

    </header>
  );
};