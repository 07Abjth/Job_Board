import express from 'express';
 import authMiddleware from '../../middlewares/authMiddleware.js';
import { getSubscriptions } from '../../controllers/subscriptionControllers.js';
  
const router = express.Router();

router.get('/get-subscription-details', authMiddleware, getSubscriptions);  
 

 
 
export default router;
