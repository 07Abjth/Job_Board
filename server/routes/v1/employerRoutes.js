import express from 'express';
import { registerEmployer, loginEmployer, updateEmployer } from '../../controllers/employerControllers.js';
import authEmployer from '../../middlewares/authEmployer.js';
import authUser from '../../middlewares/authUser.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register-employer', registerEmployer);
router.post('/login', loginEmployer);
router.patch('/employer-profile-update', authMiddleware, updateEmployer);

export default router;
