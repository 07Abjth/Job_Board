import express from 'express';
  import authMiddleware from '../../middlewares/authMiddleware.js';
import { adminLogin, adminLogOut, checkAdmin, getAllEmployers, getAllUsers, verifyJob } from '../../controllers/adminControllers.js';

const router = express.Router();

 router.post("/check-admin", authMiddleware, checkAdmin);

 router.post("/login", adminLogin);

 
 router.post("/get-all-users", authMiddleware, getAllUsers);

 router.post("/get-all-employers", authMiddleware, getAllEmployers);

 router.delete("/logout", authMiddleware, adminLogOut);



// router.patch('/admin-dashboard-data', authMiddleware, getAdminDashboardData);  

router.patch('/verify-job/:jobId', authMiddleware, verifyJob);
// router.delete('/delete-user/:userId', authMiddleware, deleteUser);

export default router;
