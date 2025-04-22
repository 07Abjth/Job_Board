// import User from '../models/userModel.js';
// import bcrypt from 'bcrypt';
// import generateToken from '../utils/generateToken.js';

// // ✅ Register Employer
// export const registerEmployer = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword, role, companyName, companyLogo, companyWebsite } = req.body;

//     if (!name || !email || !password || !confirmPassword || !role || !companyName) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ success: false, message: "Passwords do not match" });
//     }

//     if (role !== "employer") {
//       return res.status(400).json({ success: false, message: "Use job seeker registration instead." });
//     }

//     const employerExists = await User.findOne({ email });
//     if (employerExists) {
//       return res.status(400).json({ success: false, message: "Employer already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newEmployer = new User({ 
//       name, 
//       email, 
//       password: hashedPassword, 
//       role, 
//       companyName, 
//       companyLogo, 
//       companyWebsite 
//     });

//     await newEmployer.save();
//     const token = generateToken(res, newEmployer);

//     return res.status(201).json({ success: true, message: "Employer registered successfully", token });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// // ✅ Login Employer
// export const loginEmployer = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const employer = await User.findOne({ email });
//     if (!employer) return res.status(400).json({ success: false, message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, employer.password);
//     if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

//     // Correctly pass the res object and employer
//     const token = generateToken(res, employer);
    
//     return res.status(200).json({ success: true, message: 'Login successful', token });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// // ✅ Update Employer Profile
// export const updateEmployer = async (req, res) => {
//   try {
//     console.log("User from request:", req.user);
//     const employerId = req.user.id;
//     console.log("Attempting to update employer with ID:", employerId);
    
//     // First check if the employer exists
//     const employer = await User.findById(employerId);
//     if (!employer) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Employer not found" 
//       });
//     }
    
//     // Update the employer with new data
//     const updatedEmployer = await User.findByIdAndUpdate(
//       employerId, 
//       req.body, 
//       { new: true }
//     );
    
//     console.log("Updated employer:", updatedEmployer);
//     return res.status(200).json({ 
//       success: true, 
//       message: "Employer profile updated successfully", 
//       updatedEmployer 
//     });
//   } catch (error) {
//     console.error("Error in updateEmployer:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

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
      companyLogo,
      companyWebsite,
    } = req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword || !role || !companyName) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (role !== 'employer') {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Please use Job Seeker registration.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Employer with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new User({
      name,
      email,
      password: hashedPassword,
      role,
      companyName,
      companyLogo,
      companyWebsite,
    });

    await newEmployer.save();

    const token = generateToken(res, newEmployer);

    return res.status(201).json({
      success: true,
      message: 'Employer registered successfully',
      user: {
        id: newEmployer._id,
        name: newEmployer.name,
        email: newEmployer.email,
        role: newEmployer.role,
        companyName: newEmployer.companyName,
        companyLogo: newEmployer.companyLogo,
        companyWebsite: newEmployer.companyWebsite,
      },
      token,
    });
  } catch (error) {
    console.error('Error in registerEmployer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
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

    const allowedUpdates = {
      name: req.body.name,
      companyName: req.body.companyName,
      companyLogo: req.body.companyLogo,
      companyWebsite: req.body.companyWebsite,
    };

    // Filter out undefined values
    Object.keys(allowedUpdates).forEach(
      (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key]
    );

    const updatedEmployer = await User.findByIdAndUpdate(employerId, allowedUpdates, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedEmployer,
    });
  } catch (error) {
    console.error('Error in updateEmployer:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
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
    res.cookie('employerToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Immediately expire the cookie
    });

    res.json({ success: true, message: "Employer logged out successfully" });
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
 
