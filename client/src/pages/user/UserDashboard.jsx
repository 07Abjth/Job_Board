import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBookmark, FaFileAlt, FaBell } from "react-icons/fa"; 
import { useSelector } from "react-redux";

 

export const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.name || "User"}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">Here's a summary of your activity.</p>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: Stats & Recent Activity */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                <h3 className="text-lg font-semibold mb-2">Saved Jobs</h3>
                <p className="text-3xl font-bold text-blue-500">5</p>
                <Link to="/user/saved-job" className="text-sm text-blue-600 hover:underline">View Saved Jobs</Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                <h3 className="text-lg font-semibold mb-2">Applications</h3>
                <p className="text-3xl font-bold text-green-500">12</p>
                <Link to="/user/applications" className="text-sm text-green-600 hover:underline">View Applications</Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                <h3 className="text-lg font-semibold mb-2">Job Alerts</h3>
                <p className="text-3xl font-bold text-yellow-500">3</p>
                <Link to="/user/alerts" className="text-sm text-yellow-600 hover:underline">Manage Alerts</Link>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Link to="/user/activity" className="text-sm text-blue-600 hover:underline">View All</Link>
              </div>
              <ul className="space-y-3">
                <li className="p-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Applied for "Senior React Developer" at Netflix</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </li>
                <li className="p-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start">
                    <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Saved job: "UI/UX Designer" at Airbnb</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">5 days ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right column: Recommended Jobs */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recommended Jobs</h3>
                <Link to="/jobs" className="text-sm text-blue-600 hover:underline">View All</Link>
              </div>
              <ul className="space-y-4">
                <li className="border-b pb-3">
                  <h4 className="font-medium">Frontend Developer</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Google - Mountain View, CA</p>
                  <Link to="/job/123" className="inline-block text-sm text-blue-500 hover:underline">Apply Now</Link>
                </li>
                <li className="border-b pb-3">
                  <h4 className="font-medium">Data Analyst</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">TCS - Bangalore, India</p>
                  <Link to="/job/456" className="inline-block text-sm text-blue-500 hover:underline">Apply Now</Link>
                </li>
                <li>
                  <h4 className="font-medium">UX Researcher</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Microsoft - Seattle, WA</p>
                  <Link to="/job/789" className="inline-block text-sm text-blue-500 hover:underline">Apply Now</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};