import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/application/applied", {
        withCredentials: true,
      });
      console.log("Applied Jobs Data:", data);
      if (!data.success) {
        throw new Error("Failed to fetch applied jobs");
      }
      setAppliedJobs(data.applications);
    } catch (error) {
      console.error("Error fetching applied jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <div className="space-y-4">
          {appliedJobs.map((application) => (
            <div
              key={application._id}
              className="border rounded-lg p-4 flex flex-col bg-white shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{application.job.company}</h3>
                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {application.job.title}
                  </Link>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                Applied on: {new Date(application.applied_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
