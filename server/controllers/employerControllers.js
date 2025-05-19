 import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import { cloudinaryInstance } from '../config/cloudinaryConfig.js';
import Job from '../models/jobModel.js';
import Application from '../models/applicationModel.js';

// ✅ Register Employer
export const registerEmployer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      companyName,
      companyWebsite,
    } = req.body;

    if (!name || !email || !password || !confirmPassword || !role || !companyName) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (role !== 'employer') {
      return res.status(400).json({ success: false, message: 'Only employers can register here' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // ✅ Cloudinary upload
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Company logo is required' });
    }

    let companyLogoUrl;
    try {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      companyLogoUrl = cloudinaryResponse.url;
    } catch (uploadErr) {
      console.error('Cloudinary error:', uploadErr);
      return res.status(500).json({ success: false, message: 'Company logo upload failed' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new User({
      name,
      email,
      password: hashedPassword,
      role,
      companyName,
      companyWebsite,
      companyLogo: companyLogoUrl,
    });

    await newEmployer.save();

    const token = generateToken(res, newEmployer);

    return res.status(201).json({
      success: true,
      message: 'Employer registered successfully',
      token,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ Login Employer
export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employer = await User.findOne({ email });
    if (!employer || employer.role !== 'employer') {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(res, employer);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: employer._id,
        name: employer.name,
        email: employer.email,
        role: employer.role,
        companyName: employer.companyName,
        companyLogo: employer.companyLogo,
        companyWebsite: employer.companyWebsite,
      },
      token,
    });
  } catch (error) {
    console.error('Error in loginEmployer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// ✅ Update Employer Profile
export const updateEmployer = async (req, res) => {
  try {
    const employerId = req.user.id;
    const employer = await User.findById(employerId);

    if (!employer || employer.role !== 'employer') {
      return res.status(404).json({
        success: false,
        message: 'Employer not found or unauthorized',
      });
    }

    const updateData = {};
    
    // Text fields
    const textFields = ['name', 'companyName', 'companyWebsite'];
    textFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    // Company Logo upload
    if (req.files?.companyLogo?.length > 0) {
      const logoFile = req.files.companyLogo[0];
      const result = await cloudinaryInstance.uploader.upload(logoFile.path, {
        resource_type: 'image',
      });
      updateData.companyLogo = result.secure_url;
    }

    const updatedEmployer = await User.findByIdAndUpdate(employerId, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      employer: updatedEmployer,
    });
  } catch (error) {
    console.error('Error in updateEmployer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// ✅ Check Employer Authentication
export const checkEmployer = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized. Only employers can access this route.",
      });
    }

    return res.status(200).json({
      success: true,
      employer: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Logout Employer

export const logoutEmployer = (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      expires: new Date(0)
    });
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const getEmployerProfile = async (req, res) => {
  try {
    // Ensure the user is logged in and is an employer
    if (!req.user || req.user.role !== 'employer') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. Only employers can access this route.',
      });
    }

    const employer = await User.findById(req.user.id).select('-password');

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: 'Employer not found',
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: employer._id,
        name: employer.name,
        email: employer.email,
        role: employer.role,
        companyName: employer.companyName,
        companyLogo: employer.companyLogo,
        companyWebsite: employer.companyWebsite,
      },
    });
  } catch (error) {
    console.error('Error in getEmployerProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
 
//GET APPLICATIONS FOR JOB 
export const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ job: job._id }).populate('applicant', 'name email');
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET JOBS POSTED BY EMPLOYER
 
 

// GET JOBS POSTED BY EMPLOYER
export const getPostedJobs = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await Job.find({ employer: employerId }).lean();

    // For each job, count applications
    const jobIds = jobs.map((job) => job._id);
    const applicationCounts = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      { $group: { _id: "$job", count: { $sum: 1 } } }
    ]);

    // Map jobId to count
    const countMap = {};
    applicationCounts.forEach(({ _id, count }) => {
      countMap[_id.toString()] = count;
    });

    // Add applicationCount to each job
    const jobsWithCounts = jobs.map((job) => ({
      ...job,
      applicationCount: countMap[job._id.toString()] || 0
    }));

    res.status(200).json(jobsWithCounts);
  } catch (error) {
    console.error("Error in getPostedJobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
};

