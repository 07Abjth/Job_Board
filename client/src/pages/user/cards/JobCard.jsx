import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faMapMarkerAlt,
  faTag,
  faMoneyBillWave,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { Bookmark } from '../BookMarks'; // Adjust path if needed
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const JobCard = ({ job, userBookmarks = [], onBookmarkAdd, onBookmarkRemove }) => {
  const isBookmarked = userBookmarks.includes(job._id);

  return (
   <div className="relative border p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 dark:border-gray-700 dark:bg-gray-900">
  {/* Header: Logo & Company Info */}
  <div className="flex items-center mb-4">
    {job.companyLogo ? (
      <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-full mr-4 object-cover" />
    ) : (
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-white font-bold mr-4">
        {job.company?.[0]?.toUpperCase()}
      </div>
    )}
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-80 dark:text-white flex items-center gap-2 flex-wrap">
        {job.title}
        {job.isNew && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New</span>
        )}
        {job.isHot && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Hot</span>
        )}
        {job.jobMode && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            {job.jobMode}
          </span>
        )}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
        <FontAwesomeIcon icon={faBuilding} className="mr-1" />
        {job.company}
      </p>
    </div>
  </div>

  {/* Location */}
  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
    {job.location}
  </p>

  {/* Job Type */}
  {job.jobType && (
    <span className="inline-block bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs mb-3">
      <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
      {job.jobType}
    </span>
  )}

  {/* Skills */}
  <div className="flex flex-wrap gap-2 mb-3">
    {job.skills?.slice(0, 3).map((skill, index) => (
      <span key={index} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-full text-xs">
        <FontAwesomeIcon icon={faTag} className="mr-1" />
        {skill}
      </span>
    ))}
    {job.skills?.length > 3 && (
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1" title={job.skills.slice(3).join(', ')}>
        +{job.skills.length - 3} more
      </span>
    )}
  </div>

  {/* Salary */}
  {job.salary && (
    <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center">
      <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />
      Salary: {job.salary}
    </p>
  )}

  {/* Time Since Posted */}
  {job.postedAt && (
    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
      Posted {dayjs(job.postedAt).fromNow()}
    </p>
  )}

  {/* Actions */}
  <div className="flex justify-between items-center mt-3">
    <Link
      to={`/job-details/${job._id}`}
      className="text-sm text-blue-600 dark:text-blue-400 font-medium border border-blue-600 dark:border-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-800 transition"
    >
      View Details
    </Link>
    <div title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
      <Bookmark
        job={job}
        userBookmarks={userBookmarks}
        onBookmarkAdd={onBookmarkAdd}
        onBookmarkRemove={onBookmarkRemove}
      />
    </div>
  </div>
</div>
  );
} 
