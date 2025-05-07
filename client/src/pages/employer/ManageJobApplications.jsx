import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ManageJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get("/application/applications/employer", {
        withCredentials: true,
      });
      console.log("Fetched applications:", data);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await axiosInstance.put(
        `/application/${applicationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Application ${newStatus}`);
      fetchApplications(); // Refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update application status");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center p-4">Loading applications...</div>;

  if (applications.length === 0)
    return <div className="text-center p-4">No applications found for your job listings</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Job Applications</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border rounded-lg p-4 shadow-md flex flex-col gap-2"
          >
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => toggleExpand(app._id)}
            >
              <div>
                <h2 className="text-lg font-semibold">{app.user?.name || "Unknown"}</h2>
                <p className="text-sm text-gray-600">{app.user?.email || "No email"}</p>
                <p className="text-sm text-gray-500">
                  Skills: {app.skills?.join(", ") || app.user?.skills?.join(", ") || "N/A"}
                </p>
                {app.yearsOfExperience && (
                  <p className="text-sm text-gray-500">
                    Experience: {app.yearsOfExperience} years
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  Job: {app.job?.title || "N/A"} ({app.job?.location || "N/A"})
                </p>
                <p className="text-sm">
                  Status: <span className={`font-semibold ${
                    app.status === 'accepted' ? 'text-green-600' : 
                    app.status === 'rejected' ? 'text-red-600' : 
                    'text-yellow-600'}`}>
                    {app.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Applied on: {new Date(app.createdAt || app.applied_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {expandedId === app._id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-3 text-sm text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-md mb-2">Applicant Details</h3>
                    
                    <p>
                      <strong>Years of Experience:</strong>{" "}
                      {app.yearsOfExperience || "Not specified"}
                    </p>
                    
                    <p>
                      <strong>Expected Salary:</strong>{" "}
                      {app.expectedSalary ? `₹${app.expectedSalary.toLocaleString()}` : "Not specified"}
                    </p>
                    
                    <p>
                      <strong>Availability:</strong>{" "}
                      {app.availability || "Not specified"}
                    </p>
                    
                    {app.linkedinUrl && (
                      <p>
                        <strong>LinkedIn:</strong>{" "}
                        <a 
                          href={app.linkedinUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Profile
                        </a>
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-md mb-2">Job Details</h3>
                    <p>
                      <strong>Experience Required:</strong>{" "}
                      {app.job?.experience || "Not mentioned"}
                    </p>
                    <p>
                      <strong>Qualifications:</strong>{" "}
                      {app.job?.qualifications || "Not mentioned"}
                    </p>
                    <p>
                      <strong>Job Category:</strong>{" "}
                      {app.job?.category || "Not mentioned"}
                    </p>
                    <p>
                      <strong>Salary Offered:</strong>{" "}
                      {app.job?.salary ? `₹${app.job.salary.toLocaleString()}` : "Not disclosed"}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-md mb-2">Application Materials</h3>
                  
                  <p>
                    <strong>Resume:</strong>{" "}
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not Provided"
                    )}
                  </p>

                  {app.coverLetter && (
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium text-blue-600">
                        View Cover Letter
                      </summary>
                      <div className="mt-2 p-3 bg-white rounded border whitespace-pre-line">
                        {app.coverLetter}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus(app._id, "accepted")}
                disabled={app.status === "accepted"}
                className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus(app._id, "rejected")}
                disabled={app.status === "rejected"}
                className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50 hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(app._id, "pending")}
                disabled={app.status === "pending"}
                className="bg-yellow-500 text-white px-3 py-1 rounded disabled:opacity-50 hover:bg-yellow-600"
              >
                Mark Pending
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};