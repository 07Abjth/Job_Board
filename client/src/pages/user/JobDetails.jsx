import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
 import { axiosInstance } from '../../config/AxiosInstance';

export const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`); // adjust
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{job?.title}</h2>
      <p className="text-gray-600">{job?.company} — {job?.location}</p>
      <p className="mt-2">{job?.description}</p>
      <p className="mt-2 font-semibold">Salary: {job?.salary}</p>
    </div>
  );
};
