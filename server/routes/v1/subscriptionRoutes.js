import express from 'express';
 import authMiddleware from '../../middlewares/authMiddleware.js';
import { checkSubscriptionStatus, getSubscriptions, getViewAllJobs } from '../../controllers/subscriptionControllers.js';
import { verifyIsSubscribed } from '../../middlewares/verifyIsSubscribed.js';
 


const router = express.Router();

router.get('/get-subscription-details', authMiddleware, getSubscriptions);  
 
router.get("/view-all-jobs", authMiddleware, verifyIsSubscribed, getViewAllJobs);
router.get('/check-status', authMiddleware, checkSubscriptionStatus);

 
 
export default router;
