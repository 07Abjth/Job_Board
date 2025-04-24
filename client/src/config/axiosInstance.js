import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
console.log("🟡 BASE_URL:", BASE_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout to catch connection issues
  timeout: 10000
});

// Add interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      console.log("Error data:", error.response.data);
      console.log("Error status:", error.response.status);
    } else if (error.request) {
      console.log("No response received:", error.request);
    }
    return Promise.reject(error);
  }
);