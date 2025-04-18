import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import userModel from '../models/userModel.js';

//  Register a Job Seeker
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, profilePic } = req.body;
    
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    
    if (role === "employer") {
      return res.status(400).json({ success: false, message: "Use employer registration instead." });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role, profilePic });
    
    await newUser.save();
    
    // Fix here - pass res and the complete user object
    const token = generateToken(res, newUser);
    
    return res.status(201).json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Login user and Store Token in HTTP-Only Cookie
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    
    // This will set the "jwt" cookie for you
    const token = generateToken(res, user);
    
    // No need to manually set cookies here
    
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
  
  

//  Get Job Seeker Profile
export const getUsers = async (req, res) => {
  try {
    const user = await User.find(req.user).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user profile
export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Extract `id` from URL

    const user = await User.findById(id).select("-password"); // ✅ Exclude password field
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


//1️Get logged-in user's profile (No ID needed)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // ✅ Use `req.user._id`

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


 

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; //  Extract `_id` from `req.user`

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


 // Log out a user
export const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0)
    });
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ Check User Authentication
export const checkUser = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};