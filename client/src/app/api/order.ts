import { req } from "./agent";

const Order = {
  list: () => req.get("apiorder"),
  fetch: (id: number) => req.get(p/apiorder/${id}`),
  create: (values: any) => req.post("/apiorder", values),
};

export default Order;
