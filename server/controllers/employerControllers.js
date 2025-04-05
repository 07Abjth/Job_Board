import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// ✅ Register Employer
export const registerEmployer = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, companyName, companyLogo, companyWebsite } = req.body;

    if (!name || !email || !password || !confirmPassword || !role || !companyName) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (role !== "employer") {
      return res.status(400).json({ success: false, message: "Use job seeker registration instead." });
    }

    const employerExists = await User.findOne({ email });
    if (employerExists) {
      return res.status(400).json({ success: false, message: "Employer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      companyName, 
      companyLogo, 
      companyWebsite 
    });

    await newEmployer.save();
    const token = generateToken(res, newEmployer);

    return res.status(201).json({ success: true, message: "Employer registered successfully", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Login Employer
export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employer = await User.findOne({ email });
    if (!employer) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Correctly pass the res object and employer
    const token = generateToken(res, employer);
    
    return res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Update Employer Profile
export const updateEmployer = async (req, res) => {
  try {
    console.log("User from request:", req.user);
    const employerId = req.user.id;
    console.log("Attempting to update employer with ID:", employerId);
    
    // First check if the employer exists
    const employer = await User.findById(employerId);
    if (!employer) {
      return res.status(404).json({ 
        success: false, 
        message: "Employer not found" 
      });
    }
    
    // Update the employer with new data
    const updatedEmployer = await User.findByIdAndUpdate(
      employerId, 
      req.body, 
      { new: true }
    );
    
    console.log("Updated employer:", updatedEmployer);
    return res.status(200).json({ 
      success: true, 
      message: "Employer profile updated successfully", 
      updatedEmployer 
    });
  } catch (error) {
    console.error("Error in updateEmployer:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};