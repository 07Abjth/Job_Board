import Stripe from "stripe";
import User from '../models/userModel.js';  
import Order from '../models/orderModel.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Define your fixed subscription plan details
    const subscriptionPlanName = "Premium Plan";
    const subscriptionAmount = 399; // INR
    const quantity = 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: subscriptionPlanName,
            },
            unit_amount: subscriptionAmount * 100, // convert to paise
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/user/payment/cancel`,
      metadata: {
        userId,
        subscriptionPlan: subscriptionPlanName,
        subscriptionAmount: subscriptionAmount,
      },
    });

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Failed to create checkout session", error: error.message });
  }
};



 
export const getSessionStatus = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      { expand: ['customer', 'line_items', 'payment_intent'] }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const {
      metadata,
      payment_status,
      customer_details,
      amount_total
    } = session;

    // If payment is successful, update user
    if (payment_status === "paid" && metadata?.userId) {
      const updatedUser = await User.findByIdAndUpdate(
        metadata.userId,
        {
          isSubscribed: true,
          subscriptionPlan: metadata.subscriptionPlan || "Premium Plan",
          subscriptionAmount: metadata.subscriptionAmount || (amount_total / 100),
        },
        { new: true }
      );

      console.log("User subscription updated:", updatedUser.email);
      
     await Order.create({
  userId: metadata.userId,
  sessionId: session.id,
  paymentIntentId: session.payment_intent?.id || 'N/A',
  plan: metadata.subscriptionPlan || "Premium Plan",
  amount: parseFloat(metadata.subscriptionAmount) || (session.amount_total / 100),
  status: payment_status === "paid" ? "paid" : "failed",
  paidAt: new Date(),
  currency: session.currency || 'INR',
});

    }

    return res.status(200).json({
      success: true,
      sessionDetails: {
        subscriptionPlan: metadata?.subscriptionPlan || 'Premium Plan',
        subscriptionAmount: metadata?.subscriptionAmount || (amount_total / 100),
        customerEmail: customer_details?.email || 'No email provided',
        paymentStatus: payment_status || 'unknown',
      },
    });
  } catch (error) {
    console.error("Error fetching session:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch session status",
      error: error.message,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Received Stripe event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("Webhook session object:", session);
    console.log("Payment status:", session.payment_status);
    console.log("Metadata received:", session.metadata);

    if (session.payment_status === "paid") {
      const userId = session.metadata?.userId;
      console.log("User ID from metadata:", userId);

      if (userId) {
        try {
          const user = await User.findById(userId);
          if (user) {
            console.log("User found:", user.email);
            user.isSubscribed = true;
            await user.save();
            console.log(`User ${user.email} updated to subscribed`);
          } else {
            console.error("User not found for ID:", userId);
          }
        } catch (err) {
          console.error("DB update error:", err.message);
        }
      } else {
        console.error("userId missing from metadata");
      }
    }
  }

  res.status(200).json({ received: true });
};
