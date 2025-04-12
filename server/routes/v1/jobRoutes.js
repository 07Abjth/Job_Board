import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from '../../controllers/jobControllers.js';
 import authEmployer from '../../middlewares/authEmployer.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createJob); // Only Employers can create jobs
router.get('/get-all-jobs', getAllJobs); // Public route
 
router.get('/:id', getJobById)
router.patch('/update/:id', authEmployer, updateJob); // Only Employers
router.delete('/:id', authEmployer, deleteJob); // Only Employers

export default router;
