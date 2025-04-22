import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export const ProfilePage = ({ role = "user" }) => {
  const user = {
    role: "user",
    profile_api: "/user/profile",
    logout_api: "/user/logout",
  };

  if (role === "employer") {
    user.role = "employer";
    user.profile_api = "/employer/profile";
    user.logout_api = "/employer/logout";
  }

  const [profile, isloading, error] = useFetch(user.profile_api);
  const navigate = useNavigate();

  // Extract user data from the response structure
  const userData = profile?.user || profile?.employer || {};
  
  console.log(profile, "====profile");
  console.log(isloading, "====isloading");
  console.log(userData, "====userData");
  console.log(user, "====user");

  if (isloading) return <div className="text-center mt-10">Loading...</div>;
  
  if (error) {
    // Handle authentication errors
    if (error.response && error.response.status === 403) {
      return (
        <div className="text-center mt-10">
          <p className="text-red-500 mb-4">Authentication error. Please log in again.</p>
          <button 
            onClick={() => navigate(`/${user.role}/login`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      );
    }
    
    return <div className="text-center mt-10 text-red-500">Error: {error.message || "Something went wrong"}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <p><strong>Name:</strong> {userData?.name || "N/A"}</p>
          <p><strong>Email:</strong> {userData?.email || "N/A"}</p>

          {/* Employer Info */}
          {user.role === "employer" && (
            <>
              <p><strong>Company Name:</strong> {userData?.companyName || "N/A"}</p>
              <p><strong>Website:</strong> 
                <a href={userData?.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                  {userData?.companyWebsite || "N/A"}
                </a>
              </p>
              {userData?.companyLogo && (
                <img src={userData.companyLogo} alt="Company Logo" className="mt-2 w-32 h-32 object-contain rounded" />
              )}
              <Link to="/employer/profile/edit" className="inline-block mt-2 text-blue-500 hover:underline">Edit Company Profile</Link>
            </>
          )}

          {/* User Info
          {user.role === "user" && (
            <Link to="/user/profile/edit" className="inline-block mt-2 text-blue-500 hover:underline">Edit Profile</Link>)} */}
        </div>

{/* User-Only Sections */}
{user.role === "user" && (
  <>
    {/* Professional Profile */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Professional Profile</h3>
      <p><strong>Resume:</strong> {userData?.resume ? (
        <a href={userData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a>
      ) : "No resume uploaded"}</p>
      <p><strong>Work Experience:</strong> {userData?.workExperience || "Not provided"}</p>
      <p><strong>Education:</strong> {userData?.education || "Not provided"}</p>
      <p><strong>Skills:</strong> {userData?.skills || "Not provided"}</p>
      {/* <Link to="/user/profile/edit/professional" className="inline-block mt-2 text-blue-500 hover:underline">Edit Professional Profile</Link> */}
    </div>

    {/* Job Search Preferences */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Job Search Preferences</h3>
      <p><strong>Interested In:</strong> {userData?.interests || "Not specified"}</p>
      <p><strong>Preferred Locations:</strong> {userData?.preferredLocations || "Not specified"}</p>
      {/* <Link to="/user/profile/edit/preferences" className="inline-block mt-2 text-blue-500 hover:underline">Edit Preferences</Link> */}
    </div>
  </>
)}

        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <Link
            to={`/${user.role}/settings/password`}
            className="inline-block text-blue-500 hover:underline"
          >
            Change Password
          </Link>
        </div>
      </div>
      <button><Link to="/user/profile/edit" className="text-blue-500 hover:underline">Edit Profile</Link>
      </button>
    </div>
  );
};