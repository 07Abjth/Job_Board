import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const ManagePostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/employer/job/employer", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const toggleExpand = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  const handleDelete = async (jobId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this job?");
      if (!confirm) return;

      await axiosInstance.delete(`/employer/job/${jobId}`, {
        withCredentials: true,
      });

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📋 Manage Your Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg shadow-md p-4 transition-all duration-300  hover:shadow-xl cursor-pointer"
              onClick={() => toggleExpand(job._id)}
            >
              {/* COLLAPSED VIEW */}
              <div className=" flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                  <p className="text-gray-600">{job.company} | {job.location}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {job.applicationCount} Application{job.applicationCount !== 1 && 's'}
                </p>
              </div>

              {/* EXPANDED DETAILS */}
              {expandedJobId === job._id && (
                <div className="mt-4 text-sm text-base-content space-y-1">
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Category:</strong> {job.category}</p>
                  <p><strong>Salary:</strong> ₹{job.salary.toLocaleString()}</p>
                  <p><strong>Experience Required:</strong> {job.experience}</p>
                  <p><strong>Qualifications:</strong> {job.qualifications}</p>
                  <p><strong>Requirements:</strong> {job.requirements?.join(", ")}</p>
                  <p><strong>Status:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-white ${job.status === 'open' ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                      {job.status}
                    </span>
                  </p>
                  <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(job.updatedAt).toLocaleDateString()}</p>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card from toggling
                      handleDelete(job._id);
                    }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Job
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
