import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

// ✅ Create a Company (Employer Only)
export const createCompany = async (req, res) => {
  try {
    const { name, logo, website } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Company name is required" });
    }

    // Check if the logged-in user is an employer
    const employer = await User.findById(req.user.id);
    if (!employer || employer.role !== "employer") {
      return res.status(403).json({ success: false, message: "Only employers can create companies" });
    }

    // Check if employer already has a company
    const existingCompany = await Company.findOne({ employer: req.user.id });
    if (existingCompany) {
      return res.status(400).json({ success: false, message: "Employer already has a company" });
    }

    const newCompany = new Company({
      name,
      logo,
      website,
      employer: req.user.id,
    });

    await newCompany.save();
    return res.status(201).json({ success: true, message: "Company created successfully", data: newCompany });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Company Details by ID
export const getCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).populate("employer", "name email");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({ success: true, data: company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Companies (Public)
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("employer", "name email");

    return res.status(200).json({ success: true, data: companies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Company Details (Employer Only)
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ employer: req.user.id });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    company.name = req.body.name || company.name;
    company.logo = req.body.logo || company.logo;
    company.website = req.body.website || company.website;

    await company.save();
    return res.status(200).json({ success: true, message: "Company updated successfully", data: company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Company (Employer Only)
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ employer: req.user.id });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    await company.deleteOne();
    return res.status(200).json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
