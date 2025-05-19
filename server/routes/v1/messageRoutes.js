 import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { getMessages, getUsersForChat, sendMessages } from '../../controllers/messageControllers.js';




const router = express.Router();


router.get('/user', authMiddleware, getUsersForChat)

router.get('/:id', authMiddleware, getMessages)

router.post('/send/:id', authMiddleware, sendMessages); 

export default router;




