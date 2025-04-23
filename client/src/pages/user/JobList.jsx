import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 import { axiosInstance } from '../../config/axiosInstance';

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get('/jobs/get-all-jobs');  
      console.log("Fetched jobs data:", response.data);

      setJobs(response.data?.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>{job.company} — {job.location}</p>
            <Link to={`/job-list/${job._id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
