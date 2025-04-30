import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const JobDetails = () => {
  const { id } = useParams(); // job id from URL
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the job details for displaying job title, etc.
  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      setJob(response.data?.job);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Unable to fetch job details.');
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!job) {
    return <p className="text-center text-gray-600">Loading job details...</p>;
  }

  // Helper function to format salary (if needed)
  const formatSalary = (salary) => {
    if (typeof salary === 'number') {
      return salary.toLocaleString();
    }
    return salary;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6 flex items-center"
      >
        &larr; Back
      </button>

      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{job.title}</h2>
      <p className="text-lg text-gray-600 mb-2">{job.company} — {job.location}</p>

      {job.category && (
        <p className="text-sm text-gray-500 mb-2">Category: {job.category}</p>
      )}

      {job.jobType && (
        <p className="text-sm text-gray-500 mb-2">Job Type: {job.jobType}</p>
      )}

      {job.experience && (
        <p className="text-sm text-gray-500 mb-2">Experience Required: {job.experience}</p>
      )}

      {job.qualifications && (
        <p className="text-sm text-gray-500 mb-4">Qualifications: {job.qualifications}</p>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Description</h3>
        <p className="text-base text-gray-600 leading-relaxed">{job.description}</p>
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Requirements</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="text-base">{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        <div className="md:w-2/3">
          {job.salary && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Salary</h3>
              <p className="text-lg text-gray-900">₹ {formatSalary(job.salary)}</p>
            </div>
          )}
        </div>

        <div className="mt-6 md:mt-0 md:w-1/3">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-gray-700 mb-2">Location</p>
            <p className="text-lg text-gray-900">{job.location}</p>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(`/user/apply-job/${job._id}`)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
