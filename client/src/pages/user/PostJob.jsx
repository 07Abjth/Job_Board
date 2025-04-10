import React, { useState } from 'react';

export const PostJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { jobTitle, jobDescription, jobLocation };
    console.log("Job Posted:", newJob);
    // You'd send `newJob` to your backend API here
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};
