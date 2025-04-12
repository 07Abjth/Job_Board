import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/AxiosInstance';
import { JobCard } from './user/JobCard';

export const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get('/jobs/get-all-jobs');
      setLoading(true);
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
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Find your dream job 🔍</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Browse thousands of jobs from top companies. Get hired fast.
        </p>
        <Link
          to="/jobs"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse All Jobs
        </Link>
      </section>

      {/* Featured Companies */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Companies</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {['Amazon', 'Google', 'Netflix', 'TCS', 'Infosys', 'StartupX'].map((name, index) => (
            <div
              key={index}
              className="px-5 py-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link
            to="/jobs"
            className="text-blue-600 font-semibold hover:underline"
          >
            View all jobs →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore Categories</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {['IT', 'HR', 'Sales', 'Design', 'Marketing', 'Remote'].map((cat, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-blue-100 transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="text-center bg-blue-50 py-12 px-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">📬 Get Job Alerts</h3>
        <p className="mb-6 text-gray-600">Never miss a job opportunity again!</p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};
