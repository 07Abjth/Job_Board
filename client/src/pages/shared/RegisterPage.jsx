import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isEmployerRoute = location.pathname.includes("/employer/signup");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: isEmployerRoute ? "employer" : "user",
    companyName: "",
    companyWebsite: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (isEmployerRoute) {
      setCompanyLogo(file);
    } else {
      setProfilePic(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    if (isEmployerRoute && companyLogo) {
      form.append("companyLogo", companyLogo);
    }

    if (!isEmployerRoute && profilePic) {
      form.append("profilePic", profilePic);
    }

    try {
      const registerApi = isEmployerRoute
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
      <h2 className="text-2xl font-bold mb-6">
        {isEmployerRoute ? "Register as Employer" : "Register to JobBoard"}
      </h2>

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
          />
        </div>

        {isEmployerRoute && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isEmployerRoute ? "Company Logo" : "Profile Picture"}
          </label>
          <input
            type="file"
            name={isEmployerRoute ? "companyLogo" : "profilePic"}
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-sm text-gray-600">
  Already have an account?{" "}
  <Link
    to={isEmployerRoute ? "/employer/login" : "/login"}
    className="text-blue-500 hover:text-blue-600"
  >
    Log in
  </Link>
</p>

      </form>
    </div>
  );
};
