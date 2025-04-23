import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true, // make true if every bookmark should be linked to a job
    },
  },
  { timestamps: true }
);
 

export default mongoose.model("Bookmark", bookmarkSchema);
