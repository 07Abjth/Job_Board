import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/AxiosInstance';

export const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      setJob(response.data?.job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-2">{job.company} — {job.location}</p>
      <p className="mb-4">{job.description}</p>
      <p className="font-semibold">Salary: {job.salary}</p>
    </div>
  );
};
