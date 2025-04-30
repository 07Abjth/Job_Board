import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

 
export const applyForJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const jobId = req.params.id;

    if (!jobId || !req.file) {
      return res.status(400).json({ success: false, message: "Job ID and resume are required" });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({ user: req.user.id, job: jobId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    // Upload resume to cloudinary
    let uploadedResumeUrl;
    try {
      const result = await cloudinaryInstance.uploader.upload(req.file.path, {
        resource_type: "raw" // Important for PDFs and non-images
      });
      uploadedResumeUrl = result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      return res.status(500).json({ success: false, message: "Resume upload failed" });
    }

    const newApplication = new Application({
      user: req.user.id,
      job: jobId,
      resume: uploadedResumeUrl,
      coverLetter,
    });

    await newApplication.save();

    res.status(201).json({ success: true, message: "Application submitted successfully!", data: newApplication });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// ✅ Get getAppliedJobs (Job Seeker)
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
console.log(userId, "===userId");
    // Check if the user exists


    // Find all applications by this user
    const applications = await Application.find({ user: userId }).populate("job");
    console.log(applications, "===applications");
    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: "No applications found" });
    }
    

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// ✅ Get Applications for a Job (Employer)
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the job exists and belongs to the logged-in employer
    const job = await Job.findById(jobId);
    if (!job || job.employer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized or job not found" });
    }

    const applications = await Application.find({ job: jobId }).populate("user", "name email profilePic");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Applications Submitted by a Job Seeker
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job", "title employer")
      .populate("user", "name profilePic");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Application Status (Employer)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // Ensure only the employer who posted the job can update the status
    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ success: true, message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
