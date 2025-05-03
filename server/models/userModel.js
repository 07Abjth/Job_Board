import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'employer', 'admin'], required: true },

  // Optional fields
  profilePic: { type: String, default: 'https://www.example.com/default-profile.png' },  
  resume: { type: String }, // Resume URL (PDF or DOC)
  workExperience: { type: [String], default: [] },
  education: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  phone: { type: String },
  preferredLocations: { type: [String], default: [] },

  // Subscription
  isSubscribed: { type: Boolean, default: false },

  // Job Seeker specific
  experience: { type: String },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],

  // Employer specific
  companyName: { type: String },
  companyLogo: { type: String },
  companyWebsite: { type: String },
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
