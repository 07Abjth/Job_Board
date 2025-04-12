import React from 'react';
import { Link } from 'react-router-dom';

export const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition bg-white">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-sm text-gray-500 mb-1">{job.company} — {job.location}</p>
      <p className="text-sm text-gray-600 mb-2">
        {job.description.length > 100 ? `${job.description.slice(0, 100)}...` : job.description}
      </p>
      <p className="text-sm font-medium text-green-600 mb-2">Salary: ₹{job.salary}</p>
      <Link
        to={`/jobs/${job._id}`}
        className="text-blue-500 text-sm mt-2 inline-block hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};
