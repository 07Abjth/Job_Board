import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String }, // Optional field for company logo URL
    website: { type: String }, // Optional field for company website
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Foreign key reference to User (Employer)
      required: true,
    },
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt fields
);

export default mongoose.model("Company", companySchema);
