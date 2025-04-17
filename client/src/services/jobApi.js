// client/src/services/jobsApi.js
import { axiosInstance } from '../config/axiosInstance'; // Assuming you have your axios instance configured

export const getLatestJobs = async () => {
  try {
    const response = await axiosInstance.get('/jobs/get-latest-jobs');
    return response.data; // Return the data (which should include the 'jobs' array)
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    throw error; // Re-throw the error for the component to handle
  }
};