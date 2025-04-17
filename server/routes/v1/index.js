import express from 'express';
import userRoutes from './userRoutes.js';
import jobRoutes from './jobRoutes.js';
 import employerRoutes from './employerRoutes.js';
 import applicationRoutes from './applicationRoutes.js'; 
 import companyRoutes from './companyRoutes.js';
import ratingRoutes from './ratingRoutes.js';
import bookmarkRoutes from './bookmarkRoutes.js';

 const v1Router = express.Router();

// Routes
v1Router.use('/user', userRoutes);
v1Router.use('/jobs', jobRoutes);
 v1Router.use('/employer', employerRoutes);
 v1Router.use('/company', companyRoutes);
 v1Router.use('/application', applicationRoutes);
 v1Router.use('/rating', ratingRoutes);
 v1Router.use('/bookmarks', bookmarkRoutes);





export default v1Router;