import Job from '../models/jobModel.js';
import User from '../models/userModel.js';

// verifying a Job
export const verifyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.isVerified = true;
    await job.save();

    res.status(200).json({ message: 'Job verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Get all employers
export const getAllEmployers = async (req, res) => {
  try {
    const employers = await User.find({ role: "employer" });
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employers", error: err.message });
  }
};

// Delete a user/employer
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};



// ✅ Check User Authentication
export const checkAdmin = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
  };