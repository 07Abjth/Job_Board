import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { JobCard } from '../user/cards/JobCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const SavedJobs = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarked jobs and their full details
  const fetchUserBookmarks = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/bookmark/saved');
      const bookmarks = data.bookmarks || [];  // ensure bookmarks is an array
      
      if (bookmarks.length === 0) {
        // If no bookmarks exist, we can directly handle this case without API errors
        setJobDetails([]);
        return; // Exit the function early
      }

      const jobsWithDetails = await Promise.all(
        bookmarks.map(async ({ jobId, _id }) => {
          try {
            const { data: jobData } = await axiosInstance.get(`/jobs/${jobId}`);
            return {
              job: jobData.job,
              bookmarkId: _id,
            };
          } catch (err) {
            console.warn(`Could not fetch job with ID ${jobId}`);
            return null;
          }
        })
      );

      setJobDetails(jobsWithDetails.filter(Boolean)); // Remove any nulls
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      toast.error('Failed to load saved jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookmarks();
  }, []);

  const handleBookmarkRemoved = (jobIdToRemove) => {
    setJobDetails(prev =>
      prev.filter(({ job }) => job._id !== jobIdToRemove)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-600">Loading saved jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>

      {jobDetails.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't saved any jobs yet.</p>
          <p className="mt-2">
            <Link to="/jobs" className="text-blue-600 hover:underline">
              Browse jobs
            </Link>{' '}
            and click the bookmark icon to save them for later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobDetails.map(({ job, bookmarkId }) => (
            <JobCard
              key={job._id}
              job={job}
              initialIsBookmarked={true}
              initialBookmarkId={bookmarkId}
              onBookmarkRemove={handleBookmarkRemoved}
            />
          ))}
        </div>
      )}
    </div>
  );
};
