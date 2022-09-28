import { req } from "./agent";

const Basket = {
  getBasket: () => req.get("ApiBasket/GetBasket"),
  addBasket: (productId: number, quantity: number = 1) =>
    req.post(
      `ApiBasket/AddItemToBasket?productId=${productId}&quantity=${quantity}`
    ),
  removeBasket: (productId: number, quantity: number = 1) =>
    req.delete(
      `ApiBasket/RemoveBasketItem?productId=${productId}&quantity=${quantity}`
    ),
};

export default Basket;
