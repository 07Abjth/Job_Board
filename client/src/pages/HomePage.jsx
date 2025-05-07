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
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section with Search */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find your dream job 🔍</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Browse thousands of jobs from top companies. Get hired fast.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search job titles, keywords, or companies"
            className="w-full sm:w-96 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search Jobs
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Your Search</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="category" className="mr-2 text-gray-700">Category:</label>
            <select id="category" className="border rounded-md py-2 px-3 focus:outline-none" value={categoryFilter} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="IT">Information Technology</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="mr-2 text-gray-700">Location:</label>
            <input
              type="text"
              id="location"
              placeholder="City, State, or Remote"
              className="border rounded-md py-2 px-3 focus:outline-none"
              value={locationFilter}
              onChange={handleLocationChange}
            />
          </div>
          {jobTypes.length > 0 && (
            <div>
              <label className="block mb-2 text-gray-700">Job Type:</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedJobTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
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
        <h2 className="text-2xl font-semibold mb-6">Featured Companies</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {featuredCompanies.map((name, index) => (
            <div
              key={index}
              className="px-5 py-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Jobs</h2>
        {loadingLatest ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found matching your criteria.</p>
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
            className="text-blue-600 font-semibold hover:underline"
          >
            View all jobs →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 bg-gray-50 rounded-lg shadow-md mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Talent Hiring?</h2>
          <p className="text-gray-600 mb-4">
            We connect talented individuals with leading companies, offering a seamless and efficient job search experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <FontAwesomeIcon icon={faBriefcase} size="2x" className="text-blue-500 mb-2" />
              <h3 className="font-semibold">Wide Range of Jobs</h3>
              <p className="text-sm text-gray-500">Explore thousands of opportunities across various industries and locations.</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} size="2x" className="text-green-500 mb-2" />
              <h3 className="font-semibold">Stay Updated</h3>
              <p className="text-sm text-gray-500">Get the latest job postings delivered right to your inbox.</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faBuilding} size="2x" className="text-purple-500 mb-2" />
              <h3 className="font-semibold">Connect with Top Companies</h3>
              <p className="text-sm text-gray-500">Find opportunities at leading and innovative organizations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
