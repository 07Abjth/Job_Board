 
import Subscription from '../models/subscriptionModel.js';  
import Job from '../models/jobModel.js';

import User from '../models/userModel.js';  


export const getSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware

    const subscriptions = await Subscription.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscription details",
    });
  }
};


export const getViewAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find(); // or can apply filters, pagination, etc.
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};


 
export const checkSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      isSubscribed: user?.isSubscribed  
    });
  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ success: false, message: "Failed to check subscription status" });
  }
};
