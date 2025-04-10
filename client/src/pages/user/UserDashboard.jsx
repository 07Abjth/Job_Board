import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/AxiosInstance';

export const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDashboard = async () => {
    try {
      const userId = '123'; // Replace this with actual user ID from auth context
      const response = await axiosInstance.get(`/users/${userId}/dashboard`);
      setUserData(response.data?.user);
      setAppliedJobs(response.data?.appliedJobs || []);
    } catch (error) {
      console.error('Error fetching user dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Welcome, {userData?.name} 👋</h2>
      <p className="text-gray-600 mb-6">Email: {userData?.email}</p>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Applied Jobs</h3>
        {appliedJobs.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div key={job._id} className="p-4 border rounded shadow-sm">
                <h4 className="text-lg font-bold">{job.title}</h4>
                <p>{job.company} — {job.location}</p>
                <Link to={`/jobs/${job._id}`} className="text-blue-500 hover:underline">View</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/saved-jobs"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Saved Jobs
      </Link>
    </div>
  );
};
