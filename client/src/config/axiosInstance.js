// src/utils/axiosInstance.js or wherever you manage axios

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Log BASE_URL only in development
if (import.meta.env.DEV) {
  console.log("🟡 BASE_URL:", BASE_URL);
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds to prevent hanging
});

// Optional: Global response interceptor (auth + error handling)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        console.warn("Unauthorized: Please log in again.");
        // Optional: Redirect to login or show modal
      }

      if (status === 403) {
        console.warn("Forbidden: You don't have access.");
      }
    } else {
      console.error("Network or server issue:", error.message);
    }

    return Promise.reject(error);
  }
);
