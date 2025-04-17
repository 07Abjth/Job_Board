import React from 'react';
import settings from '../../config/settings';

const JobList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const jobsPerPage = settings.jobsPerPage;
  // ... your job fetching logic using settings.apiUrl ...
  // ... your pagination logic using jobsPerPage ...

  return (
    <div>
      <h1>Job Listings</h1>
      {/* ... display jobs ... */}
      <p>Showing {jobsPerPage} jobs per page.</p>
    </div>
  );
};

export default JobList;