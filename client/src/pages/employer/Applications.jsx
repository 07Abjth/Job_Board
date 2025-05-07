import React from "react";

export const Applications = () => {
  // Ideally, this would come from an API
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      applicantName: "Ravi Kumar",
      email: "ravi@example.com",
      resumeLink: "https://example.com/resume/ravi.pdf",
      appliedOn: "2025-05-01",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      applicantName: "Megha Sharma",
      email: "megha@example.com",
      resumeLink: "https://example.com/resume/megha.pdf",
      appliedOn: "2025-04-30",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Job Applications</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center"
          >
            <div>
              <h2 className="text-lg font-medium">{app.applicantName}</h2>
              <p className="text-sm text-gray-600">
                Applied for: <strong>{app.jobTitle}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Email: {app.email}
              </p>
              <p className="text-sm text-gray-600">
                Applied on: {app.appliedOn}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <a
                href={app.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

 