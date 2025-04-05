import express from "express";
 
 import { createCompany, deleteCompany, getAllCompanies, getCompanyDetails, updateCompany } from "../../controllers/companyControllers.js";
import authUser from "../../middlewares/authUser.js";

const router = express.Router();

// ✅ Create a Company (Employer Only)
router.post("/", authUser, createCompany);

// ✅ Get All Companies (Public)
router.get("/", getAllCompanies);

// ✅ Get a Single Company by ID (Public)
router.get("/:id", getCompanyDetails);

// ✅ Update Company Details (Employer Only)
router.put("/", authUser, updateCompany);

// ✅ Delete Company (Employer Only)
router.delete("/", authUser, deleteCompany);

export default router;
