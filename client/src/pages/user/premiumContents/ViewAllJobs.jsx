import React from 'react';
import { useSubscription } from '../../../hooks/useSubscription';
import { Navigate } from 'react-router-dom';
import { JobList } from '../../../pages/user/JobList'; 

const ViewAllJobs = () => {
  const { isSubscribed, loading } = useSubscription();

  if (loading) return <p>Loading...</p>;
  if (!isSubscribed) return <Navigate to="/user/subscription" />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Premium Jobs</h1>
      <JobList endpoint="/jobs/view-all-jobs" />
    </div>
  );
};

export default ViewAllJobs;
