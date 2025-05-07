import express from 'express';
import { registerEmployer, loginEmployer, updateEmployer, checkEmployer, logoutEmployer, getEmployerProfile, getApplicationsForJob, getPostedJobs } from '../../controllers/employerControllers.js';
 import authMiddleware from '../../middlewares/authMiddleware.js';
import { upload } from '../../middlewares/upload.js';

const router = express.Router();

router.post('/register', upload.single('companyLogo'), registerEmployer);
router.post('/login', loginEmployer);
router.post("/check-employer", authMiddleware, checkEmployer);
router.get('/profile', authMiddleware, getEmployerProfile)

router.patch(
  '/profile/update',
  authMiddleware,
  upload.fields([{ name: 'companyLogo', maxCount: 1 }]),
  updateEmployer
);


router.get('/getApplicationsForJob/:id', authMiddleware, getApplicationsForJob); 

router.get('/job/employer', authMiddleware, getPostedJobs); 

  
  router.delete('/logout', authMiddleware, logoutEmployer);



export default router;
