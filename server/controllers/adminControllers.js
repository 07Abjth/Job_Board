import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";  


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



 

  export const adminLogOut = (req, res) => {
    try {
      console.log("Admin logout initiated.");
      
      // Clear the authentication token cookie
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None", // Adjust based on your frontend/backend domains
        secure: true      // Required if using HTTPS
      }); console.log("Cookie cleared successfully.");
      
  console.log("Admin logged out successfully.");
  
      return res.status(200).json({ message: "Admin logged out successfully." });
    } catch (error) {
      console.error("Logout Error:", error);
      return res.status(500).json({ message: "Server error during logout." });
    }
  };
  

  // Admin login controller
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and has admin role
    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or insufficient permissions"
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate token and set cookie
    generateToken(res, user);

    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: userData
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

// Check if user is admin
export const checkAdmin = async (req, res) => {
  try {
    // req.user should be set by the authMiddleware
    const userId = req.user.id;
    
    // Verify user exists and is admin
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }
    
    // User is verified as admin
    res.status(200).json({
      success: true,
      message: "Admin authentication verified",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin verification"
    });
  }
};