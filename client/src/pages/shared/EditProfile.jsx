import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    workExperience: "",
    education: "",
    skills: "",
    interests: "",
    preferredLocations: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current user data
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/user/profile");
        const user = data.user;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          resume: user.resume || "",
          workExperience: user.workExperience || "",
          education: user.education || "",
          skills: user.skills || "",
          interests: user.interests || "",
          preferredLocations: user.preferredLocations || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("/user/profile/update", formData);
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/user/profile"), 1500);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Something went wrong!");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Resume (URL)</label>
          <input type="text" name="resume" value={formData.resume} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Work Experience</label>
          <textarea name="workExperience" value={formData.workExperience} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Education</label>
          <textarea name="education" value={formData.education} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Interests</label>
          <input type="text" name="interests" value={formData.interests} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Preferred Locations</label>
          <input type="text" name="preferredLocations" value={formData.preferredLocations} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};
