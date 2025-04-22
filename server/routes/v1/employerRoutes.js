import express from 'express';
import { registerEmployer, loginEmployer, updateEmployer, checkEmployer, logoutEmployer, getEmployerProfile } from '../../controllers/employerControllers.js';
 import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register-employer', registerEmployer);
router.post('/login', loginEmployer);
router.post("/check-employer", authMiddleware, checkEmployer);
router.get('/profile', authMiddleware, getEmployerProfile)

router.patch('/employer-profile-update', authMiddleware, updateEmployer);
router.post('/logout', authMiddleware, logoutEmployer);



export default router;
