import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Bookmark = ({ job, userBookmarks = [], onBookmarkAdd, onBookmarkRemove }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  // This effect runs when the component mounts or when userBookmarks changes
  useEffect(() => {
    // Check if the bookmark exists in userBookmarks
    const found = userBookmarks.find(bookmark => {
      // If jobId is an object (populated from backend), compare with _id
      if (bookmark.jobId && typeof bookmark.jobId === 'object') {
        return bookmark.jobId._id === job._id;
      }
      // If jobId is a string, compare directly
      return bookmark.jobId === job._id;
    });
    
    if (found) {
      setIsBookmarked(true);
      setBookmarkId(found._id);
    } else {
      setIsBookmarked(false);
      setBookmarkId(null);
    }
    
    // For debugging
    console.log("Job ID:", job._id);
    console.log("Found bookmark:", found);
    console.log("All bookmarks:", userBookmarks);
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
        const response = await axiosInstance.post('/bookmark/save', {
          jobId: job._id,
        });
        setIsBookmarked(true);
        setBookmarkId(response.data.bookmark._id);
        toast.success('Job saved to your list');
        if (onBookmarkAdd) {
          onBookmarkAdd(response.data.bookmark);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update saved jobs');
    }
  };
  
  return (
    <button
      onClick={handleBookmarkToggle}
      className={`p-1 rounded-full transition ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`}
    >
      <FontAwesomeIcon icon={isBookmarked ? faTrash : faBookmark} className="h-5 w-5" />
    </button>
  );
};

 