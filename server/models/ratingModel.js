import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ Job Seeker who is giving the rating
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ Employer who is receiving the rating
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // ✅ Rating must be between 1 and 5 stars
  },
  review: {
    type: String, // Optional feedback text
  },
}, { timestamps: true });

export default mongoose.model("Rating", ratingSchema);
