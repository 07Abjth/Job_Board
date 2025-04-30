import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  category: { type: String, enum: ["Tech", "Finance", "Healthcare", "Education", "Marketing", "Management","Other","Telecaller"], required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  experience: { type: String, required: true },
  qualifications: { type: String, required: true }, 
  requirements: { type: [String], required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["open", "closed"], default: "open" },
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
