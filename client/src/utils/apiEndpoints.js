const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiEndpoints = {
  profile_api: `${API_BASE}/api/v1/profile`,
  update_api: `${API_BASE}/api/v1/profile/update`,
  // Add more as needed
};

export default apiEndpoints;