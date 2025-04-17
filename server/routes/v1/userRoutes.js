import express from 'express';
import { registerUser, loginUser, logoutUser, updateUser, getUsers,getUserProfile, getUserProfileById, checkUser } from '../../controllers/userControllers.js';
import authUser from '../../middlewares/authUser.js';
import authAdmin from '../../middlewares/authAdmin.js';
import {upload} from '../../middlewares/upload.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
 
const router = express.Router();

router.post('/register', upload.single('profilePic'), registerUser);
router.post('/login', loginUser);
router.get('/get-users', getUsers);

router.post("/check-user", authMiddleware, checkUser);


// ✅ Get logged-in user's profile
router.get("/profile", authUser, getUserProfile);

// ✅ Get specific user profile by ID (Only for admins)
router.get("/get-user-profile/:id", authAdmin, getUserProfileById);

router.patch('/update', authUser,  updateUser);
router.post('/logout',authMiddleware, logoutUser);

export default router;

