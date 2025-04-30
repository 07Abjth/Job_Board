import express from "express";
 
 import { applyForJob, getAppliedJobs, getJobApplications, getUserApplications, updateApplicationStatus } from "../../controllers/applicationControllers.js";
import authUser from "../../middlewares/authUser.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

// ✅ Apply for a Job (Job Seeker)
router.post("/:id/apply", authMiddleware,  upload.single('resume'), applyForJob);

router.get("/applied", authMiddleware, getAppliedJobs);

// ✅ Get All Applications for a Job (Employer)
router.get("/job/:jobId", authMiddleware, getJobApplications);

// ✅ Get Applications Submitted by a Job Seeker
router.get("/user", authMiddleware, getUserApplications);

// ✅ Update Application Status (Employer)
router.put("/:applicationId/status",  authMiddleware, updateApplicationStatus);

export default router;
