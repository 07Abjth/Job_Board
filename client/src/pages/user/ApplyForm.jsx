import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const ApplyForm = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [availability, setAvailability] = useState('');
  const [certified, setCertified] = useState(false);
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
  
    if (!coverLetter || !resume || !yearsOfExperience) {
      setError('Please fill all required fields and upload a resume.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resume);
      formData.append('yearsOfExperience', yearsOfExperience);
      
      // Handle skills - convert string to array
      if (skills) {
        const skillsArray = skills.split(',').map(skill => skill.trim());
        formData.append('skills', JSON.stringify(skillsArray));
      }
      
      if (expectedSalary) {
        formData.append('expectedSalary', expectedSalary);
      }
      
      if (linkedinUrl) {
        formData.append('linkedinUrl', linkedinUrl);
      }
      
      if (availability) {
        formData.append('availability', availability);
      }
      
      formData.append('certified', certified);

      console.log('Submitting application with data:', Object.fromEntries(formData));

      const response = await axiosInstance.post(`/application/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.success) {
        alert('Application submitted successfully!');
        navigate('/');
      } else {
        setError(response.data.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <p className="text-center text-red-600">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all block mx-auto"
        >
          Try Again
        </button>
      </div>
    );
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

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="Years of experience"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Skills (Comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Expected Salary</label>
          <input
            type="number"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="Expected salary"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
            placeholder="Your LinkedIn profile"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select availability</option>
            <option value="Immediate">Immediate</option>
            <option value="1 Week">1 Week</option>
            <option value="2 Weeks">2 Weeks</option>
            <option value="1 Month">1 Month</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={certified}
            onChange={(e) => setCertified(e.target.checked)}
            className="mr-2"
            id="certified"
            required
          />
          <label htmlFor="certified" className="text-gray-700">I certify the above information is true.</label>
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