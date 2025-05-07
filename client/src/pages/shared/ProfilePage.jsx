import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import useFetch from "../../hooks/useFetch";
import { FileUploadComponent } from "../../components/FileUploadComponent";
import { isEqual } from "lodash";
import { saveUserData } from "../../redux/features/userSlice";
import { saveEmployerData } from "../../redux/features/employerSlice";
import { useSelector, useDispatch } from "react-redux";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user and employer from Redux store
  const { user: reduxUser } = useSelector((state) => state.user);
  const { employer: reduxEmployer } = useSelector((state) => state.employer);

  // Determine role
  const role =
    reduxUser?.role ||
    reduxUser?.user?.role ||
    reduxEmployer?.role ||
    (window.location.pathname.includes("/employer") ? "employer" : "user");

  // Set up endpoints based on role
  const apiEndpoints = {
    role: role,
    profile_api: role === "employer" ? "/employer/profile" : "/user/profile",
    logout_api: role === "employer" ? "/employer/logout" : "/user/logout",
    update_api:
      role === "employer" ? "/employer/profile/update" : "/user/profile/update",
  };

  // Fetch profile
  const [profile, isLoading, error] = useFetch(apiEndpoints.profile_api);

  const userData = profile?.user || profile?.employer || profile || {};

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");

  // Determine the correct image field name based on role
  const imageFieldName = role === "employer" ? "companyLogo" : "profilePic";

  // Debug info
  console.log("Current role:", role);
  console.log("Image field name:", imageFieldName);
  console.log("User data:", userData);

  useEffect(() => {
    if (
      userData &&
      Object.keys(userData).length > 0 &&
      !isEqual(formData, userData)
    ) {
      setFormData({ ...userData });
      
      // Use the correct field based on role for preview
      const imageUrl = role === "employer" ? userData.companyLogo : userData.profilePic;
      setProfilePreview(imageUrl || null);
      
      setResumeName(userData.resume ? "Resume Uploaded" : "");
      
      console.log("Set profile preview to:", imageUrl);
    }
  }, [userData, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (name, fileUrl, previewUrl) => {
    console.log(`File uploaded: ${name}, with URL: ${fileUrl}`);
    setFormData((prev) => ({ ...prev, [name]: fileUrl }));

    // Handle image preview based on field name
    if (name === imageFieldName) {
      console.log("Setting profile preview to:", previewUrl);
      setProfilePreview(previewUrl);
    }

    if (name === "resume") {
      setResumeName("Resume Uploaded");
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile with data:", formData);
      console.log("Using endpoint:", apiEndpoints.update_api);
      
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Add all text fields
      for (const key in formData) {
        if (key !== "profilePic" && key !== "companyLogo" && key !== "resume" && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      }
      
      // Add file fields if they exist in formData and are File objects
      if (formData.profilePic instanceof File) {
        formDataToSend.append("profilePic", formData.profilePic);
      }
      
      if (formData.companyLogo instanceof File) {
        formDataToSend.append("companyLogo", formData.companyLogo);
      }
      
      if (formData.resume instanceof File) {
        formDataToSend.append("resume", formData.resume);
      }
      
      const response = await axiosInstance.patch(
        apiEndpoints.update_api,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", response.data);

      const updated = response.data?.user || response.data?.employer || response.data;

      // Save to Redux store based on role
      if (role === "employer") {
        dispatch(saveEmployerData(updated));
      } else {
        dispatch(saveUserData(updated));
      }

      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert(`Update failed: ${err.message || "Unknown error"}`);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      return (
        <div className="text-center mt-10">
          <p className="text-red-500 mb-4">
            Authentication error. Please log in again.
          </p>
          <div className="mb-4">
            <p className="text-gray-600">Current role: {apiEndpoints.role}</p>
            <p className="text-gray-600">
              API endpoint: {apiEndpoints.profile_api}
            </p>
          </div>
          <button
            onClick={() => navigate(`/${apiEndpoints.role}/login`)}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      );
    }

    return (
      <div className="text-center mt-10 text-red-500">
        <p>Error: {error.message || "Something went wrong"}</p>
        <p className="mt-2 text-gray-600">
          Endpoint: {apiEndpoints.profile_api}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={profilePreview || "/default-avatar.png"}
                alt={role === "employer" ? "Company Logo" : "Profile Picture"}
              />
            </div>
          </div>

          {editMode && (
            <div>
              <FileUploadComponent
                name={imageFieldName}
                accept="image/*"
                onFileSelect={handleFileUpload}
                label={`Upload ${role === "employer" ? "Company Logo" : "Profile Picture"}`}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label font-semibold">Name</label>
            {editMode ? (
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ) : (
              <p>{userData.name || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="label font-semibold">Email</label>
            <p>{userData.email || "N/A"}</p>
          </div>

          {role === "employer" && (
            <>
              <div>
                <label className="label font-semibold">Company Name</label>
                {editMode ? (
                  <input
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p>{userData.companyName || "N/A"}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">Website</label>
                {editMode ? (
                  <input
                    name="companyWebsite"
                    value={formData.companyWebsite || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <a
                    href={userData.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {userData.companyWebsite || "N/A"}
                  </a>
                )}
              </div>
            </>
          )}

          {role === "user" && (
            <>
              <div>
                <label className="label font-semibold">Resume</label>
                {editMode ? (
                  <FileUploadComponent
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onFileSelect={handleFileUpload}
                    label={resumeName || "Upload Resume"}
                  />
                ) : userData.resume ? (
                  <a
                    href={userData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </a>
                ) : (
                  "No resume uploaded"
                )}
              </div>

              <div>
                <label className="label font-semibold">Skills</label>
                {editMode ? (
                  <input
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p>{userData.skills || "N/A"}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">Work Experience</label>
                {editMode ? (
                  <input
                    name="workExperience"
                    value={formData.workExperience || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p>{userData.workExperience || "N/A"}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">Education</label>
                {editMode ? (
                  <input
                    name="education"
                    value={formData.education || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p>{userData.education || "N/A"}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}

          <Link
            to={`/${role}/settings/password`}
            className="btn btn-link ml-auto"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};