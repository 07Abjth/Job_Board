import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','employer', 'admin'], required: true },
  profilePic: { type: String, default: 'https://www.example.com/default-profile.png' }, // Optional

  // Fields for Job Seekers
  resume: { type: String }, // Resume URL (uploaded file)
  skills: { type: [String] },
  experience: { type: String },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],

  // Fields for Employers
  companyName: { type: String },
  companyLogo: { type: String },
  companyWebsite: { type: String },
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
