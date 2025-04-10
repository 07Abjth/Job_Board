import React, { useEffect, useState } from 'react';
 import { axiosInstance } from '../../config/AxiosInstance';

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const userId = '123'; // replace with actual auth/user context
      const response = await axiosInstance.get(`/users/${userId}/saved-jobs`);
      setSavedJobs(response.data?.savedJobs || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  if (loading) return <p>Loading saved jobs...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p>{job.company} — {job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
