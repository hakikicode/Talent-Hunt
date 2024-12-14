import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PaymentOptions = () => {
  const [proof, setProof] = useState(null);

  // Handle manual payment proof upload
  const handleProofUpload = async (e) => {
    e.preventDefault();

    if (!proof) {
      toast.error("Please upload your payment proof.");
      return;
    }

    const formData = new FormData();
    formData.append("proof", proof);

    try {
      const response = await fetch("/api/payments/manual", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Payment proof submitted successfully. Admin will verify soon.");
      } else {
        toast.error("Failed to submit payment proof. Try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle Paystack payment
  const handlePaystackPayment = () => {
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Paystack public key
      email: "user@example.com", // Replace with dynamic user email
      amount: 5000 * 100, // Amount in kobo
      currency: "NGN",
      callback: function (response) {
        toast.success(`Payment successful! Reference: ${response.reference}`);
      },
      onClose: function () {
        toast.error("Transaction was not completed.");
      },
    });

    handler.openIframe();
  };

  // Handle Stripe payment (redirects to Stripe page)
  const handleStripePayment = () => {
    window.location.href = "/payment"; // Redirect to Stripe payment page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Choose Your Payment Method
        </h2>

        {/* Manual Payment Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Bank Tranfer Payment</h3>
          <p className="mt-2 text-gray-600">Please pay to the following account details:</p>
          <ul className="mt-2 text-gray-800">
            <li>
            <b>Price Per Vote:</b> N500
            </li>
            <li>
            <b>Account Number:</b> 4820114717
            </li>
            <li>
            <b>Bank:</b> Eco Bank
            </li>
            <li>
            <b>Account Name:</b> Kwara Talents Harvest
            </li>
          </ul>

          <form
            id="payment-proof-form"
            className="mt-4"
            onSubmit={handleProofUpload}
          >
            <label
              htmlFor="proof"
              className="block text-gray-700 font-semibold"
            >
              Upload Proof of Payment:
            </label>
            <input
              type="file"
              id="proof"
              name="proof"
              accept="image/*"
              className="mt-2 block w-full border rounded-md p-2"
              onChange={(e) => setProof(e.target.files[0])}
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit Payment
            </button>
          </form>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Paystack Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Pay with Paystack</h3>
          <p className="mt-2 text-gray-600">
            Use Paystack for fast and secure online payments.
          </p>
          <button
            id="paystack-button"
            onClick={handlePaystackPayment}
            className="w-full px-4 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Pay with Paystack
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Stripe Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Pay with Stripe</h3>
          <p className="mt-2 text-gray-600">
            Use Stripe for seamless global payments.
          </p>
          <button
            id="stripe-button"
            onClick={handleStripePayment}
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
