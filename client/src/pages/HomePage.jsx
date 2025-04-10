import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/AxiosInstance';
 
export const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get('/jobs/jobs'); // adjust backend URL
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Find your dream job 🔍</h1>
        <p className="text-gray-600 mb-6">Browse thousands of jobs. Get hired fast.</p>
        <Link to="/jobs" className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Browse All Jobs
        </Link>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 6).map((job) => (
              <div key={job._id} className="border p-4 rounded shadow hover:shadow-md transition">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company} — {job.location}</p>
                <Link to={`/jobs/${job._id}`} className="text-blue-500 text-sm mt-2 inline-block hover:underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
