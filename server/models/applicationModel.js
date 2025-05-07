import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // the job seeker
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true, // the job being applied to
    },
    resume: {
      type: String, // URL or file path
      required: true,
    },
    coverLetter: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    skills: [
      {
        type: String,
      },
    ],
    expectedSalary: {
      type: Number,
    },
    linkedinUrl: {
      type: String,
    },
    availability: {
      type: String, // e.g., "Immediate", "2 Weeks", etc.
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    certified: {
      type: Boolean,
      default: false, // checkbox for “I certify the info is true…”
    },
    applied_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
