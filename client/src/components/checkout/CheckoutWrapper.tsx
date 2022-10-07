import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkoutPage";
import { useAppDispatch } from '../../app/store/store.config'; 
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { setBasket } from "../../app/store/basket.slice";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51LjD7TCnsAshMZPBrTNbZL8lasYcovCPjgeMvIbOQZ2QSJjCMwrU505v8NcknT9L15cEhLCRb4e4BRsdi6y8Dz9i00Z9virDYw"
);
export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  
  //สร้างหรืออัพเดทใบสั่งซื้อส่งไปยัง Stripe (incomplete)
  useEffect(() => {
    agent.Payment.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);
  
  if (loading) return <LoadingComponent message="Loading checkout..." />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
