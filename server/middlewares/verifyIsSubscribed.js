// middlewares/verifyIsSubscribed.js
import User from '../models/userModel.js';

export const verifyIsSubscribed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);  
    if (!user || !user.isSubscribed) {
      return res.status(403).json({ success: false, message: "Subscription required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Subscription check failed" });
  }
};
