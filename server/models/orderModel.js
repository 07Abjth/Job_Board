
import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    
    
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sessionId: String,
        paymentIntentId: String,
        plan: String,
        amount: Number,
        status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
        currency: { type: String, default: 'INR' },
        paidAt: Date,
        createdAt: { type: Date, default: Date.now }
      }

    , { timestamps: true }

)
export default mongoose.model("Order", orderSchema);
  