import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createCheckoutSession,
  getSessionStatus,
  stripeWebhook,
} from "../../controllers/paymentControllers.js";
import bodyParser from "body-parser"; // needed for webhook


const router = express.Router();



router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

router.get("/session-status/:sessionId", authMiddleware, getSessionStatus);

// Stripe webhook ( RAW BODY REQUIRED – no auth middleware!)
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
