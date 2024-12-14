import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Form/CheckoutForm";
import { useLocation } from "react-router-dom";
import Container from "../components/Shared/Container";
import Title from "../components/Shared/Title";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ContestRegistration = () => {
  const location = useLocation();
  const contest = location.state?.contest || {};

  return (
    <Container>
            <Title title="Contestant Registration | Kwara Talent Harvest" />
      <h1 className="text-2xl text-gray-600 font-semibold text-center mt-10">{`Registration for ${contest?.title}`}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={contest?.entryFee} />
      </Elements>
    </Container>
  );
};

export default ContestRegistration;
