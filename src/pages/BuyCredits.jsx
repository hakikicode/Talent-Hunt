import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Form/CheckoutForm";
import Container from "../components/Shared/Container";
import { useState } from "react";
import Title from "../components/Shared/Title";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const BuyCredits = () => {
  const [amount, setAmount] = useState(100);

  return (
    <Container>
      <Title title="Credits | Talent Hunt" />
      <h1 className="text-2xl text-gray-600 font-semibold text-center mt-10">{`Buy Credits`}</h1>

      <div className="flex flex-row items-center justify-center gap-3 mt-10">
        <button
          onClick={() => setAmount(50)}
          style={{ backgroundColor: amount === 50 && "#312e81" }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          50
        </button>
        <button
          onClick={() => setAmount(100)}
          style={{ backgroundColor: amount === 100 && "#312e81" }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          100
        </button>
        <button
          onClick={() => setAmount(200)}
          style={{ backgroundColor: amount === 200 && "#312e81" }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          200
        </button>
        <button
          onClick={() => setAmount(500)}
          style={{ backgroundColor: amount === 500 && "#312e81" }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          500
        </button>
        <button
          onClick={() => setAmount(1000)}
          style={{ backgroundColor: amount === 1000 && "#312e81" }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md"
        >
          1000
        </button>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount / 2} isCredit />
      </Elements>
    </Container>
  );
};

export default BuyCredits;
