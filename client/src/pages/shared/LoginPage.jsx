import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";

// Import Redux actions for user and employer
import { saveUserData } from "../../redux/features/userSlice";
import { saveEmployerData } from "../../redux/features/employerSlice";

export const LoginPage = ({ role = "user" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔧 Role-based configuration
  const user = {
    role: "user",
    login_api: "/user/login",
    profile_route: "/user/profile",
    home_route: "/",
    signup_route: "/signup",
  };

  if (role === "employer") {
    user.role = "employer";
    user.login_api = "/employer/login";
    user.profile_route = "/employer/profile";
    user.home_route = "/employer/home";
    user.signup_route = "/employer/signup";
  }

  if (role === "admin") {
    user.role = "admin";
    user.login_api = "/admin/login";
    user.profile_route = "/admin/profile";
    user.home_route = "/admin/dashboard";
    user.signup_route = "/admin/signup";
  }

  console.log("====USER ROLE CONFIG====", user);

  // 🚀 Submit Handler
  const onSubmit = async (data) => {
    try {
      console.log("📨 Login Data:", data);
      const response = await axiosInstance.post(user.login_api, data);
      console.log("✅ Login Success Response:", response.data);

      // 📦 Role-based Redux dispatch
      if (user.role === "user") {
        dispatch(saveUserData(response.data));
      } else if (user.role === "employer") {
        dispatch(saveEmployerData(response.data));
      }
      // Add admin dispatch if needed later

      toast.success("Login successful");
      navigate(user.home_route);
    } catch (error) {
      console.error("❌ Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-16 ">
      <h2 className="text-2xl font-bold mb-6">Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Login Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-sm text-gray-600">
          If you haven't registered yet,{" "}
          <Link to={user.signup_route} className="text-blue-500 hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
