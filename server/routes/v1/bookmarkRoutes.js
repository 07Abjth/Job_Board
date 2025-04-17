import express from 'express';
import { createBookmark, getBookmarks, removeBookmark } from '../../controllers/bookMarkControllers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
 

const router = express.Router();

// Save a job as bookmarked
router.post('/save', authMiddleware, createBookmark);

// Get all bookmarked jobs for the logged-in user
router.get('/saved', authMiddleware, getBookmarks);

// Remove a bookmarked job
router.delete('/:bookmarkId', authMiddleware, removeBookmark);

export default router;
