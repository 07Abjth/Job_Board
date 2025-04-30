import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "No subscription product provided" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.name || 'Subscription Plan',
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/user/payment/cancel`,
      metadata: {
        userId,
        subscriptionPlan: products[0].name || 'Premium',
        subscriptionAmount: products[0].price || 299,
      },
      
    });

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Failed to create checkout session", error: error.message });
  }
};



 
// export const getSessionStatus = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

//     return res.status(200).json({
//       success: true,
//       sessionDetails: {
//         subscriptionPlan: session.metadata.subscriptionPlan,
//         subscriptionAmount: session.metadata.subscriptionAmount,
//         customerEmail: session.customer_details.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching session:", error.message);
//     return res.status(500).json({ success: false, message: "Unable to fetch session status" });
//   }
// };


export const getSessionStatus = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required"
      });
    }
    
    console.log("Retrieving session with ID:", sessionId);
    
    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      { expand: ['customer', 'line_items', 'payment_intent'] }
    );
    
    // Log the session data to help with debugging
    console.log("Session retrieved:", {
      id: session.id,
      status: session.status,
      metadata: session.metadata,
      customerDetails: session.customer_details,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total
    });
    
    // Check if we have the session data
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }
    
    // Format the subscription amount as a number
    let subscriptionAmount = 0;
    if (session.metadata && session.metadata.subscriptionAmount) {
      // Try to parse the metadata subscription amount
      subscriptionAmount = parseFloat(session.metadata.subscriptionAmount);
    } else if (session.amount_total) {
      // Fallback to amount_total from the session
      subscriptionAmount = session.amount_total / 100; // Convert cents to dollars/rupees
    }
    
    return res.status(200).json({
      success: true,
      sessionDetails: {
        subscriptionPlan: session.metadata?.subscriptionPlan || 'Premium Plan',
        subscriptionAmount: subscriptionAmount.toString(), // Send as string to avoid JSON issues
        customerEmail: session.customer_details?.email || 'No email provided',
        paymentStatus: session.payment_status || 'unknown'
      },
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch session status",
      error: error.message
    });
  }
};