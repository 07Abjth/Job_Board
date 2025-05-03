import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import useFetch from "../../hooks/useFetch";
import { FileUploadComponent } from "../../components/FileUploadComponent";

export const ProfilePage = ({ role = "user" }) => {
  const navigate = useNavigate();

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

  const [profile, isLoading, error] = useFetch(user.profile_api);
  const userData = profile?.user || profile?.employer || {};

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
      setProfilePreview(userData.profilePic || null);
      setResumeName(userData.resume ? "Resume Uploaded" : "");
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (name, fileUrl, previewUrl) => {
    setFormData((prev) => ({ ...prev, [name]: fileUrl }));

    if (name === "profilePic") {
      setProfilePreview(previewUrl);
    }

    if (name === "resume") {
      setResumeName("Resume Uploaded");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(
        `/${user.role}/profile/update`,
        formData
      );

      setEditMode(false);
      window.location.reload(); // refresh
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error) {
    if (error.response?.status === 403) {
      return (
        <div className="text-center mt-10">
          <p className="text-red-500 mb-4">
            Authentication error. Please log in again.
          </p>
          <button
            onClick={() => navigate(`/${user.role}/login`)}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      );
    }

    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePreview || "/default-avatar.png"} alt="avatar" />
            </div>
          </div>

          {editMode && (
            <FileUploadComponent
              name="profilePic"
              accept="image/*"
              onFileSelect={handleFileUpload}
            />
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

          {user.role === "employer" && (
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

          {user.role === "user" && (
            <>
              <div>
                <label className="label font-semibold">Resume</label>
                {editMode ? (
                  <FileUploadComponent
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onFileSelect={handleFileUpload}
                    label={resumeName}
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
            to={`/${user.role}/settings/password`}
            className="btn btn-link ml-auto"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};
