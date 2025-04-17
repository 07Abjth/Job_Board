import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { JobCard } from '../user/JobCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const SavedJobs = () => {
  const [jobDetails, setJobDetails] = useState([]);
  console.log('Job Details:', jobDetails);
  
  const [loading, setLoading] = useState(true);

  // Get bookmarked jobs from localStorage
  const getBookmarkIds = () => {
    const bookmarks = localStorage.getItem('bookmarkedJobs');
    console.log('Bookmarks:', bookmarks);
    
    return bookmarks ? Object.entries(JSON.parse(bookmarks)) : [];
  };
console.log('Bookmark IDs:', getBookmarkIds());

  const fetchJobsByBookmarkIds = async () => {
    try {
      setLoading(true);
      const bookmarksArray = getBookmarkIds(); // [ [jobId, bookmarkId], ... ]

      const jobs = await Promise.all(
        bookmarksArray.map(async ([jobId, bookmarkId]) => {
          try {
            const res = await axiosInstance.get(`/jobs/${jobId}`);
            return {
              job: res.data.job,
              bookmarkId,
            };
          } catch (err) {
            console.warn(`Could not fetch job with ID ${jobId}`);
            return null;
          }
        })
      );

      setJobDetails(jobs.filter(Boolean));
    } catch (err) {
      toast.error('Failed to load saved jobs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsByBookmarkIds();
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
