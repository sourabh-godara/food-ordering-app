"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkOut";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Oc5F8SEKvCazDhIc8HQpNMBGyWWubrgKQXYW28ZFp8OElf3my57cg4t49PGf1HWZyxiy6rSa8steK2ikOy3zXT400XeHt7gLl"
);

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    mode: "payment",
    amount: 1099,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
