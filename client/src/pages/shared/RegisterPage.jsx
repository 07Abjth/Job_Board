import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (profilePic) {
      form.append("profilePic", profilePic);
    }

    try {
      const registerApi =
        formData.role === "employer"
          ? "/employer/register"
          : formData.role === "admin"
          ? "/admin/register"
          : "/user/register";

      const response = await axiosInstance.post(registerApi, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(saveUserData(response.data));
      toast.success("Registration successful!");

      navigate(
        formData.role === "employer"
          ? "/employer"
          : formData.role === "admin"
          ? "/admin/dashboard"
          : "/",
        { replace: true }
      );
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register to JobBoard</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            placeholder="Confirm your password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">I am a</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          >
            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>
            {/* <option value="admin">Administrator</option> */}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
