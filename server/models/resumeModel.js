// models/Resume.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  pdfUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional
});

module.exports = mongoose.model("Resume", resumeSchema);
