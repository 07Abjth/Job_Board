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
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export const JobCard = ({ job, initialIsBookmarked = false, initialBookmarkId = null, onBookmarkRemove }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [bookmarkId, setBookmarkId] = useState(initialBookmarkId);

  useEffect(() => {
    if (!initialIsBookmarked && !initialBookmarkId) {
      const bookmarksString = localStorage.getItem('bookmarkedJobs');
      if (bookmarksString) {
        const bookmarks = JSON.parse(bookmarksString);
        if (bookmarks[job._id]) {
          setIsBookmarked(true);
          setBookmarkId(bookmarks[job._id]);
        }
      }
    }
  }, [job._id, initialIsBookmarked, initialBookmarkId]);

  const updateLocalStorage = (jobId, bookmarkIdValue) => {
    const bookmarksString = localStorage.getItem('bookmarkedJobs');
    let bookmarks = bookmarksString ? JSON.parse(bookmarksString) : {};

    if (bookmarkIdValue === null) {
      delete bookmarks[jobId];
    } else {
      bookmarks[jobId] = bookmarkIdValue;
    }

    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarks));
  };

  const handleBook = async () => {
    try {
      if (isBookmarked) {
        if (!bookmarkId) {
          console.error("Trying to delete a bookmark, but bookmarkId is null");
          return;
        }

        const unsaveResponse = await axiosInstance.delete(`/bookmarks/${bookmarkId}`);
        console.log('Job Unsaved:', unsaveResponse.data);

        setIsBookmarked(false);
        setBookmarkId(null);
        updateLocalStorage(job._id, null);
        toast.success('Saved job removed!');

        if (onBookmarkRemove) {
          onBookmarkRemove(job._id);
        }
      } else {
        const saveResponse = await axiosInstance.post('/bookmarks/save', {
          jobId: job._id,
        });

        const newBookmarkId = saveResponse.data.bookmark._id;
        setIsBookmarked(true);
        setBookmarkId(newBookmarkId);
        updateLocalStorage(job._id, newBookmarkId);
        toast.success('Job saved!');
      }
    } catch (error) {
      console.error('Error bookmarking job:', error);

      if (error.response && error.response.status === 404) {
        setIsBookmarked(false);
        setBookmarkId(null);
        updateLocalStorage(job._id, null);
        toast.info('Bookmark was already removed from the database.');

        if (onBookmarkRemove) {
          onBookmarkRemove(job._id);
        }

        const updatedBookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs') || '{}');
        if (Object.keys(updatedBookmarks).length === 0) {
          console.log("No saved jobs left");
        }
      } else {
        toast.error('Failed to bookmark job.');
      }
    }
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition bg-white">
      <div className="flex items-center mb-2">
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        )}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold flex items-center">
            {job.title}
            {job.isNew && (
              <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">New</span>
            )}
            {job.isHot && (
              <span className="ml-2 text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Hot</span>
            )}
          </h3>
          <p className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faBuilding} className="mr-1" />
            {job.company}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-1">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
        {job.location}
      </p>

      {job.jobType && (
        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mb-2">
          <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
          {job.jobType}
        </span>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
          >
            <FontAwesomeIcon icon={faTag} className="mr-1" />
            {skill}
          </span>
        ))}
      </div>

      {job.salary && (
        <p className="text-sm font-medium text-green-600 mb-2">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" />
          Salary: {job.salary}
        </p>
      )}

      <div className="flex justify-between items-center mt-2">
      <Link to={`/job-details/${job._id}`} className="text-blue-600 text-sm hover:underline">
  View Details
</Link>

        <button 
        
          onClick={handleBook}
          className="text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <FontAwesomeIcon
            icon={isBookmarked ? faTrash : faBookmark}
            style={{ color: isBookmarked ? 'red' : 'inherit' }}
          />
        </button>
      </div>
    </div>
  );
};
