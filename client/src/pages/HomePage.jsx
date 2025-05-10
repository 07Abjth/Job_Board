import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobCard } from './user/cards/JobCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLatestJobs } from '../services/jobApi';  
import {
  faBriefcase,
  faBuilding,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [featuredCompanies] = useState(['Amazon', 'Google', 'Netflix', 'TCS', 'Infosys', 'StartupX']);

  useEffect(() => {
    const fetchLatestJobsData = async () => {
      setLoadingLatest(true);
      try {
        const data = await getLatestJobs();  // Fetch jobs without login
        setLatestJobs(data?.jobs || []);
      } catch (error) {
        console.error('Error in HomePage fetching latest jobs:', error);
      } finally {
        setLoadingLatest(false);
      }
    };

    fetchLatestJobsData();
  }, []);

  useEffect(() => {
    const dummyJobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];
    setJobTypes(dummyJobTypes);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleJobTypeChange = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = latestJobs.filter((job) => {
    const matchesSearch = searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || job.category === categoryFilter;
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);
    return matchesSearch && matchesCategory && matchesLocation && matchesJobType;
  });

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Hero Section with Search */}
      <section className="text-center mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find Your Dream Job 🔍</h1>
        <p className="text-lg mb-6">
          Browse thousands of jobs from top companies. Get hired fast.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search job titles, keywords, or companies"
            className="w-full sm:w-96 px-6 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base-content bg-base-100"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
          >
            Search Jobs
          </button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-8 bg-base-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filter Your Search</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="category" className="mr-2 text-base-content">Category:</label>
            <select
              id="category"
              className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="IT">Information Technology</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="mr-2 text-base-content">Location:</label>
            <input
              type="text"
              id="location"
              placeholder="City, State, or Remote"
              className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
              value={locationFilter}
              onChange={handleLocationChange}
            />
          </div>
          {jobTypes.length > 0 && (
            <div className="flex flex-col">
              <label className="block mb-2 text-base-content">Job Type:</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedJobTypes.includes(type) ? 'bg-primary text-primary-content' : 'bg-base-300 text-base-content hover:bg-primary/20'
                    } focus:outline-none transition`}
                    onClick={() => handleJobTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-base-content">Featured Companies</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {featuredCompanies.map((name, index) => (
            <div
              key={index}
              className="px-5 py-3 border rounded-lg shadow-sm bg-base-100 text-base-content hover:shadow-lg transition"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-base-content">Latest Jobs</h2>
        {loadingLatest ? (
          <p className="text-base-content">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-base-content">No jobs found matching your criteria.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link
            to="/subscription"
            className="text-primary font-semibold hover:underline"
          >
            View all jobs →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 bg-base-200 rounded-lg shadow-md mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-base-content">Why Choose Talent Hiring?</h2>
          <p className="text-base-content/70 mb-4">
            We connect talented individuals with leading companies, offering a seamless and efficient job search experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <FontAwesomeIcon icon={faBriefcase} size="2x" className="text-blue-500 mb-2" />
              <h3 className="font-semibold text-base-content">Wide Range of Jobs</h3>
              <p className="text-sm text-base-content/60">Explore thousands of opportunities across various industries and locations.</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" className="text-green-500 mb-2" />
              <h3 className="font-semibold text-base-content">Stay Updated</h3>
              <p className="text-sm text-base-content/60">Get the latest job postings delivered right to your inbox.</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faBuilding} size="2x" className="text-purple-500 mb-2" />
              <h3 className="font-semibold text-base-content">Connect with Top Companies</h3>
              <p className="text-sm text-base-content/60">Find opportunities at leading and innovative organizations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};