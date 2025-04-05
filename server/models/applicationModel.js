import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Job Seeker
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true }, // Job
    resume: { type: String },
    coverLetter: { type: String },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    applied_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
