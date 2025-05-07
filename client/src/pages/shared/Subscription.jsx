import React from "react";
import { toast } from "react-toastify";
import { loadStripe } from '@stripe/stripe-js';  
import { axiosInstance } from "../../config/axiosInstance";
import useFetch from "../../hooks/useFetch";

export const Subscription = () => {
  // const[subscriptionDetails, setSubscriptionDetails] = React.useState([]);
const [subscriptionDetails, isLoading, error] = useFetch("/subscription/get-subscription-details");

console.log(subscriptionDetails, "===subscriptionDetails===");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!subscriptionDetails) return <div>No subscription details available.</div>;

  const makePayment = async (selectedPlan) => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_key);
      
      const session = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: {
          products: [
            {
              name: selectedPlan.name,
              price: selectedPlan.price,
              quantity: 1
            }
          ],
        },
      });
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
  
      if (result.error) {
        console.error(result.error.message);
        toast.error(result.error.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in makePayment:", error);
      toast.error("Payment failed. Please try again.");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Free Plan</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Get access to basic features. Ideal for job seekers exploring opportunities.
          </p>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>✔️ Limited job applications per month</li>
            <li>✔️ Basic profile visibility</li>
            <li>✔️ Email notifications</li>
          </ul>
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 flex flex-col items-center border-2 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Premium Plan</h2>
          <p className="text-2xl font-bold dark:text-gray-300"> ₹399/ </p>
<h2> Per Month</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Unlock full access to all jobs, premium support, and much more.
          </p>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>🚀 Unlimited job applications</li>
            <li>🚀 Priority profile highlighting</li>
            <li>🚀 Direct employer messaging</li>
            <li>🚀 Early access to top jobs</li>
          </ul>
          <button
onClick={() =>
  makePayment({
    name: "Premium Plan",
    price: 399,
  })
}            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};
