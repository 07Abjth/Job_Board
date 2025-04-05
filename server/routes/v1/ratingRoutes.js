import express from "express";
import {
  createRating,
  getEmployerRatings,
  getUserRatings,
  deleteRating,
} from "../../controllers/ratingControllers.js";
import authUser from "../../middlewares/authUser.js";
 
const router = express.Router();

//  Add a Rating (Job Seeker)
router.post("/", authUser, createRating);

//  Get All Ratings for an Employer
router.get("/:employerId", getEmployerRatings);

//  Get Job Seeker's Own Ratings
router.get("/user", authUser, getUserRatings);

//  Delete a Rating (Only Job Seeker Who Created It)
router.delete("/:ratingId", authUser, deleteRating);

export default router;
