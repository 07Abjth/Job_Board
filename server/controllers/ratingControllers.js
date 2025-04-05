import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";

// ✅ Create a Rating (Job Seeker rates Employer)
export const createRating = async (req, res) => {
  try {
    const { employerId, rating, review } = req.body;

    if (!employerId || !rating) {
      return res.status(400).json({ success: false, message: "Employer ID and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
    }

    const employer = await User.findById(employerId);
    if (!employer || employer.role !== "employer") {
      return res.status(404).json({ success: false, message: "Employer not found" });
    }

    // Check if the user has already rated this employer
    const existingRating = await Rating.findOne({ reviewer: req.user.id, employer: employerId });
    if (existingRating) {
      return res.status(400).json({ success: false, message: "You have already rated this employer." });
    }

    const newRating = new Rating({
      reviewer: req.user.id, // Job Seeker giving the rating
      employer: employerId, // Employer receiving the rating
      rating,
      review,
    });

    await newRating.save();

    res.status(201).json({ success: true, message: "Rating submitted successfully!", data: newRating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Ratings for an Employer
export const getEmployerRatings = async (req, res) => {
  try {
    const { employerId } = req.params;

    const ratings = await Rating.find({ employer: employerId }).populate("reviewer", "name profilePic");

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Job Seeker’s Own Ratings
export const getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ reviewer: req.user.id }).populate("employer", "name companyName");

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a Rating (Only Job Seeker Who Created It)
export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ success: false, message: "Rating not found" });
    }

    if (rating.reviewer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this rating" });
    }

    await rating.deleteOne();
    res.status(200).json({ success: true, message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
