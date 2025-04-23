import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { JobCard } from '../user/cards/JobCard';

export const SavedJobs = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/bookmark/saved');
        console.log("Saved jobs response:", response.data);
        
        setBookmarkedJobs(response.data.bookmarks || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmarkRemove = (jobId) => {
    console.log("Removing saved job with ID:", jobId);
    setBookmarkedJobs(prevJobs => 
      prevJobs.filter(bookmark => {
        // For debugging
        console.log("Comparing:", bookmark.jobId?._id || bookmark.jobId, "with", jobId);
        
        // Handle both object and string jobId
        if (bookmark.jobId && typeof bookmark.jobId === 'object') {
          return bookmark.jobId._id !== jobId;
        }
        return bookmark.jobId !== jobId;
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      
      {loading ? (
        <div>Loading your saved jobs...</div>
      ) : bookmarkedJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't saved any jobs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedJobs.map(bookmark => {
            console.log("Rendering bookmark:", bookmark);
            return (
              <JobCard 
                key={bookmark._id} 
                job={bookmark.jobId} 
                // Pass the full bookmarks array for proper state management
                userBookmarks={bookmarkedJobs}
                onBookmarkRemove={handleBookmarkRemove}
                // Add onBookmarkAdd for consistency
                onBookmarkAdd={(newBookmark) => {
                  setBookmarkedJobs(prev => [...prev, newBookmark]);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};