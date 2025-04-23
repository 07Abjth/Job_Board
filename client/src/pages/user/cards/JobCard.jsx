import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faTag, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import  {Bookmark}  from '../BookMarks'; // Adjust the import path as necessary

export const JobCard = ({ job, userBookmarks = [], onBookmarkAdd, onBookmarkRemove }) => {
  return (
    <div className="relative border p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
      <div className="flex items-center mb-4">
        {job.companyLogo && (
          <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-full mr-4 object-cover" />
        )}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            {job.title}
            {job.isNew && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New</span>
            )}
            {job.isHot && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Hot</span>
            )}
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <FontAwesomeIcon icon={faBuilding} className="mr-1" />
            {job.company}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-2 flex items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
        {job.location}
      </p>

      {job.jobType && (
        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs mb-3">
          <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
          {job.jobType}
        </span>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            <FontAwesomeIcon icon={faTag} className="mr-1" />
            {skill}
          </span>
        ))}
      </div>

      {job.salary && (
        <p className="text-sm font-medium text-green-600 mb-2 flex items-center">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />
          Salary: {job.salary}
        </p>
      )}

      <div className="flex justify-between items-center mt-3">
        <Link to={`/job-details/${job._id}`} className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition">
          View Details
        </Link>
        <Bookmark
          job={job}
          userBookmarks={userBookmarks}
          onBookmarkAdd={onBookmarkAdd}
          onBookmarkRemove={onBookmarkRemove}
        />
      </div>
    </div>
  );
};
