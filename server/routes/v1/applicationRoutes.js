import express from "express";
 
 import { applyForJob, getJobApplications, getUserApplications, updateApplicationStatus } from "../../controllers/applicationControllers.js";
import authUser from "../../middlewares/authUser.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Apply for a Job (Job Seeker)
router.post("/apply-job", authMiddleware, applyForJob);

// ✅ Get All Applications for a Job (Employer)
router.get("/job/:jobId", authMiddleware, getJobApplications);

// ✅ Get Applications Submitted by a Job Seeker
router.get("/user", authMiddleware, getUserApplications);

// ✅ Update Application Status (Employer)
router.put("/:applicationId/status",  authMiddleware, updateApplicationStatus);

export default router;
