import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBookmark, FaFileAlt, FaBell } from "react-icons/fa"; 

export const UserDashboard = () => {
  const user = {
    name: "Vivek",
    email: "vivek@example.com",
    role: "Job Seeker",
    avatar: "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar (Left Navigation) */}
      <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen shadow-md fixed top-0 left-0 p-6">
        <div className="mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-semibold">{user.name}</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          <span className="inline-block mt-1 text-xs text-blue-500">{user.role}</span>
        </div>
        <nav className="flex flex-col space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUserCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/jobs"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaFileAlt className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>Browse Jobs</span>
          </Link>
          <Link
            to="/saved"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBookmark className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>Saved Jobs</span>
          </Link>
          <Link
            to="/applications"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaFileAlt className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>My Applications</span>
          </Link>
          <Link
            to="/alerts"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>Job Alerts</span>
          </Link>
          <Link
            to="/profile/edit"
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUserCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span>Edit Profile</span>
          </Link>
          {/* Add more navigation links as needed */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Welcome Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">Here's a summary of your activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Stats Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2">Saved Jobs</h3>
            <p className="text-3xl font-bold text-blue-500">5</p>
            <Link to="/saved" className="text-sm text-blue-600 hover:underline">View Saved Jobs</Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2">Applications Sent</h3>
            <p className="text-3xl font-bold text-green-500">12</p>
            <Link to="/applications" className="text-sm text-green-600 hover:underline">View Applications</Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2">Job Alerts Active</h3>
            <p className="text-3xl font-bold text-yellow-500">3</p>
            <Link to="/alerts" className="text-sm text-yellow-600 hover:underline">Manage Alerts</Link>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-6">
          <h3 className="text-lg font-semibold mb-3">Recommended Jobs For You</h3>
          <ul className="space-y-3">
            <li className="border-b pb-2">
              <Link to="/job/123" className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md">
                <div>
                  <h4 className="font-semibold">Frontend Developer</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Google - Mountain View, CA</p>
                </div>
                <span className="text-blue-500 text-sm">Apply Now</span>
              </Link>
            </li>
            <li className="border-b pb-2">
              <Link to="/job/456" className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md">
                <div>
                  <h4 className="font-semibold">Data Analyst</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">TCS - Bangalore, India</p>
                </div>
                <span className="text-blue-500 text-sm">Apply Now</span>
              </Link>
            </li>
            {/* Add more recommended jobs here */}
          </ul>
          <div className="mt-4 text-center">
            <Link to="/jobs" className="text-blue-600 hover:underline">See All Jobs</Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Applied for "Senior React Developer" at Netflix - 2 days ago</li>
            <li>Saved job: "UI/UX Designer" at Airbnb - 5 days ago</li>
            {/* Add more recent activity items */}
          </ul>
        </div>
      </div>
    </div>
  );
};