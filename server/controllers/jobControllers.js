import Job from '../models/jobModel.js';
 
// ✅ Create a New Job (Employer Only)
export const createJob = async (req, res) => {
  try {
    // Check if the user is an employer
    if (req.user.role !== 'employer') {
      return res.status(403).json({ success: false, message: 'Only employers can post jobs' });
    }

    // Destructure the required fields from the request body
    const {
      title,
      description,
      company,
      location,
      salary,
      category,
      jobType,
      experience,
      qualifications,
      requirements,
    } = req.body;

    // Check if all necessary fields are provided
    if (!title || !description || !company || !location || !salary || !category || !jobType || !experience || !qualifications || !requirements) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Create a new job document
    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      category,
      jobType,
      experience,
      qualifications,
      requirements,
      employer: req.user.id, // Employer ID is set from the authenticated user
    });

    // Save the job to the database
    await job.save();

    // Return success response
    return res.status(201).json({ success: true, message: 'Job created successfully', job });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ Get All Jobs (Public)
export const getAllJobs = async (req, res) => {
  try {
    const { category, location, minSalary, maxSalary } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minSalary) filter.salary = { $gte: minSalary };
    if (maxSalary) filter.salary = { ...filter.salary, $lte: maxSalary };

    const jobs = await Job.find(filter).populate('employer', 'name companyName');
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a Single Job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "name email companyName companyLogo");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Update a Job (Employer Only)
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    if (req.user.id !== job.employer.toString()) {
      return res.status(403).json({ success: false, message: 'Only the employer can update this job' });
    }

    Object.assign(job, req.body);
    await job.save();
    return res.status(200).json({ success: true, message: 'Job updated successfully', job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a Job (Employer Only)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    if (req.user.id !== job.employer.toString()) {
      return res.status(403).json({ success: false, message: 'Only the employer can delete this job' });
    }

    await job.deleteOne();
    return res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// getLatestJobs
export const getLatestJobs = async (req, res) => {
  console.log('🔥 getLatestJobs called');

  try {
    const latestJobs = await Job.find({})
      .sort({ createdAt: -1 }) // Sort by the 'createdAt' field in descending order (newest first)
      .limit(10); // Limit the number of latest jobs to retrieve (adjust as needed)
      console.log('🔥 getLatestJobs called');

    res.status(200).json({ success: true, jobs: latestJobs });
  } catch (error) {
    console.error('Error fetching latest jobs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch latest jobs' });
  }
};
