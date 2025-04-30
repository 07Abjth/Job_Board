import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const ApplyForm = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!applicantName || !applicantEmail || !coverLetter || !resume) {
      setError('Please fill all fields and upload a resume.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
      formData.append('jobId', id); // <-- IMPORTANT
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resume);
  
      const response = await axiosInstance.post(`/application/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 201) {
        alert('Application submitted successfully!');
        navigate('/');
      } else {
        setError('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!job) {
    return <p className="text-center text-gray-600">Loading job details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6 flex items-center"
      >
        &larr; Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Apply for {job.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="Write a short cover letter..."
            rows="6"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};
