import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

  

export const applyForJob = async (req, res) => {
  try {
    const { 
      coverLetter, 
      yearsOfExperience, 
      skills, 
      expectedSalary, 
      linkedinUrl, 
      availability, 
      certified 
    } = req.body;
    
    const jobId = req.params.id;
    
    // Log request body for debugging
    console.log("Application request body:", req.body);
    console.log("File received:", req.file);

    // Check if the job ID and resume are provided
    if (!jobId || !req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Job ID and resume are required" 
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found" 
      });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ 
      user: req.user.id, 
      job: jobId 
    });
    
    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        message: "You have already applied for this job" 
      });
    }

    // Upload resume to Cloudinary
    let uploadedResumeUrl;
    try {
      const result = await cloudinaryInstance.uploader.upload(req.file.path, {
        resource_type: "raw", // Important for PDFs and non-image files
        folder: "resumes", // Store in a specific folder
      });
      uploadedResumeUrl = result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Resume upload failed" 
      });
    }

    // Parse skills if it's a JSON string
    let parsedSkills = [];
    if (skills) {
      try {
        parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : skills;
      } catch (error) {
        console.error('Error parsing skills:', error);
        // If parsing fails, treat as a single skill
        parsedSkills = [skills];
      }
    }

    // Create a new application
    const newApplication = new Application({
      user: req.user.id,
      job: jobId,
      resume: uploadedResumeUrl,
      coverLetter: coverLetter || "",
      yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : 0,
      skills: parsedSkills,
      expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
      linkedinUrl: linkedinUrl || "",
      availability: availability || "",
      certified: certified === "true" || certified === true,
    });

    // Save the application
    await newApplication.save();

    // Return success response
    res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully!", 
      data: newApplication 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "An error occurred while processing your application" 
    });
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


//  Get Applications for Employer (All Jobs)


export const getApplicationsForEmployer = async (req, res) => {
  try {
    const employerId = req.user.id;

    // Step 1: Find jobs posted by this employer
    const jobs = await Job.find({ employer: employerId }, "_id");

    if (!jobs || jobs.length === 0) {
      return res.status(200).json([]);
    }

    const jobIds = jobs.map((job) => job._id);

    // Step 2: Find applications for those jobs with proper population
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate({
        path: "user",
        select: "name email profilePic skills experience"
      })
      .populate({
        path: "job",
        select: "title location category salary experience qualifications"
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    // Log for debugging
    console.log(`Found ${applications.length} applications for employer ${employerId}`);

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching employer applications:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error fetching applications" 
    });
  }
};