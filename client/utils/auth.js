


import axiosInstance from "./api";

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/check-auth"); // adjust endpoint
    return response?.data?.isAuthenticated || false;
  } catch (err) {
    return false;
  }
};

// Logout (if your backend supports it)
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout"); // endpoint to clear cookie
  } catch (err) {
    console.error("Logout failed", err);
  }
};
