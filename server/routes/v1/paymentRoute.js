import express from 'express';
 import authMiddleware from '../../middlewares/authMiddleware.js';
import { createCheckoutSession, getSessionStatus  } from '../../controllers/paymentControllers.js';

const router = express.Router();

router.post('/create-checkout-session', authMiddleware, createCheckoutSession);  
 

 
router.get('/session-status/:sessionId',   authMiddleware, getSessionStatus);  

export default router;
