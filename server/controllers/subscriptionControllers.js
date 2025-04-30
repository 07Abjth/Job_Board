 
import Subscription from '../models/subscriptionModel.js'; // assuming you have a Subscription model

export const getSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id; // from authMiddleware

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
