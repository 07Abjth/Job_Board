 import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { JobCard } from '../user/cards/JobCard'; 

export const JobList = ({ endpoint = '/jobs/get-all-jobs?limit=6' }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchJobs = async () => {
  try {
    const response = await axiosInstance.get(endpoint);
    console.log("Jobs API Response:", response.data);
    setJobs(response.data?.data || []); 
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchJobs();
  }, [endpoint]);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            userBookmarks={[]} // Optional: Replace with actual bookmarks if needed
            onBookmarkAdd={() => {}}
            onBookmarkRemove={() => {}}
          />
        ))
      )}
    </div>
  );
};
