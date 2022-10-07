import { req } from './agent';

const Payments = {
  createPaymentIntent: () => req.post("apipayments", {}),
};

export default Payments;