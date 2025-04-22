import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  faBriefcase,
  faMapMarkerAlt,
  faBuilding,
  faTag,
  faMoneyBillWave,
  faBookmark,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bookmark as BookmarkIcon } from "lucide-react";
import { Bookmark as BookmarkOutlineIcon } from "lucide-react";
import { axiosInstance } from '../../../config/axiosInstance';
import { toast } from 'react-toastify';

export const JobCard = ({ job, userBookmarks = [], onBookmarkRemove, onBookmarkAdd }) => {
  console.log("JobCard job:", job);
  console.log("JobCard userBookmarks:", userBookmarks);
    console.log("JobCard onBookmarkRemove:", onBookmarkRemove);
  console.log("JobCard onBookmarkAdd:", onBookmarkAdd);
    
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    const found = userBookmarks.find(bookmark => bookmark.jobId === job._id);
    if (found) {
      setIsBookmarked(true);
      setBookmarkId(found._id);
    } else {
      setIsBookmarked(false);
      setBookmarkId(null);
    }
  }, [job._id, userBookmarks]);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        if (!bookmarkId) {
          console.error("Trying to delete a bookmark, but bookmarkId is null");
          return;
        }
        await axiosInstance.delete(`/bookmark/${bookmarkId}`);
        setIsBookmarked(false);
        setBookmarkId(null);
        toast.success('Job removed from saved jobs');
        if (onBookmarkRemove) {
          onBookmarkRemove(job._id);
        }
      } else {
        const response = await axiosInstance.post('/bookmark/save', { jobId: job._id });
        setIsBookmarked(true);
        setBookmarkId(response.data.bookmark._id);
        toast.success('Job saved to your list');
        if (onBookmarkAdd) {
          onBookmarkAdd(response.data.bookmark);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      if (error.response && error.response.status === 404 && isBookmarked) {
        setIsBookmarked(false);
        setBookmarkId(null);
        toast.info('Bookmark was already removed from the database.');
        if (onBookmarkRemove) {
          onBookmarkRemove(job._id);
        }
      } else {
        toast.error('Failed to update saved jobs');
      }
    }
  };

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
        <button
          onClick={handleBookmarkToggle}
          className={`p-1 rounded-full transition ${
            isBookmarked ? 'text-red-500' : 'text-gray-400'
          } hover:text-red-600 focus:outline-none`}
        >
          <FontAwesomeIcon icon={isBookmarked ? faTrash : faBookmark} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};