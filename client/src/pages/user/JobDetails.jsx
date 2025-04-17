import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/AxiosInstance';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format salary with commas
  const formatSalary = (salary) => {
    const numberFormat = new Intl.NumberFormat('en-IN'); // 'en-IN' for Indian numbers (comma as thousand separator)
    return numberFormat.format(salary);
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      setJob(response.data?.job);
    } catch (error) {
      setError('Error fetching job details. Please try again later.');
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading job details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!job) return <p className="text-center text-gray-600">Job not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="text-blue-600 hover:underline mb-6 flex items-center"
      >
        &larr; Back to Job Listings
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="md:w-2/3">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{job.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{job.company} — {job.location}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Description</h3>
            <p className="text-base text-gray-600 leading-relaxed">{job.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Requirements</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              {job.requirements && job.requirements.length > 0 ? (
                job.requirements.map((requirement, index) => (
                  <li key={index} className="text-base">{requirement}</li>
                ))
              ) : (
                <li className="text-base">No specific requirements listed.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:w-1/3">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-xl font-semibold text-gray-700 mb-2">Salary</p>
            <p className="text-lg text-gray-900">${formatSalary(job.salary)}</p>

            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-700 mb-2">How to Apply</p>
              <p className="text-gray-600">{job.applicationInstructions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => alert('Feature to apply will be added soon!')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
