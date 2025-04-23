import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance.js';  

export const ApplyForm = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    jobId: jobId, // Include the jobId in the form data
    jobTitle: '', // To potentially display on the form
    companyName: '', // To potentially display on the form
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ... other state variables for form handling and validation

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/jobs/get-job/${jobId}`);
        if (response.data?.job) {
          setJobDetails(response.data.job);
          setFormData(prevState => ({
            ...prevState,
            jobTitle: response.data.job.title || '',
            companyName: response.data.job.company || '',
          }));
        } else {
          setError('Job details not found.');
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to fetch job details.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  // const handleChange = (e) => {
  //   //   existing handleChange logic ...
  // };

  const validateForm = () => {
    //   existing validation logic ...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //   existing handleSubmit logic ...
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('jobId', formData.jobId); // Send the jobId to the backend

      try {
        //   API call to submit the application ...
      } catch (error) {
        console.error('Error submitting application:', error);
        // ... error handling ...
      }
    }
  };


  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Apply for {jobDetails?.title || 'this Job'} at {jobDetails?.company || 'this Company'}
      </h2>
      {/*   form fields, displaying job details ... */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/*   form inputs ... */}
        <input type="hidden" name="jobId" value={formData.jobId} /> {/* Hidden field to ensure jobId is sent */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button while loading
          >
            {/* ... */}
          </button>
        </div>
      </form>
    </div>
  );
};
