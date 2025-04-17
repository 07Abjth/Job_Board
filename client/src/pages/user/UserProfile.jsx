import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <p><strong>Name:</strong> {userData?.name || "N/A"}</p>
          <p><strong>Email:</strong> {userData?.email || "N/A"}</p>
          {/* Add more personal details here */}
          <Link to="/user/profile/edit" className="inline-block mt-2 text-blue-500 hover:underline">Edit Profile</Link>
        </div>

        {/* Professional Profile */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Professional Profile</h3>
          <p><strong>Resume:</strong> {userData?.resume ? <Link to={userData.resume} target="_blank" className="text-blue-500 hover:underline">View Resume</Link> : "No resume uploaded"}</p>
          <p><strong>Work Experience:</strong> {/* Display work experience */}</p>
          <p><strong>Education:</strong> {/* Display education */}</p>
          <p><strong>Skills:</strong> {/* Display skills */}</p>
          <Link to="/user/profile/edit/professional" className="inline-block mt-2 text-blue-500 hover:underline">Edit Professional Profile</Link>
        </div>

        {/* Job Search Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Job Search Preferences</h3>
          <p><strong>Interested In:</strong> {/* Display preferred job types */}</p>
          <p><strong>Preferred Locations:</strong> {/* Display preferred locations */}</p>
          {/* Add more preferences */}
          <Link to="/user/profile/edit/preferences" className="inline-block mt-2 text-blue-500 hover:underline">Edit Preferences</Link>
        </div>

        {/* Account Settings (Optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <Link to="/user/settings/password" className="inline-block text-blue-500 hover:underline">Change Password</Link>
          {/* Add other account settings links */}
        </div>
      </div>
    </div>
  );
};