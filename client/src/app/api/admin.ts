import { createFormData, req } from "./agent";

const Admins = {
  createProduct: (product: any) =>
    req.postForm("apiproducts", createFormData(product)),
  updateProduct: (product: any) =>
    req.putForm("apiproducts", createFormData(product)),
  deleteProduct: (id: number) => req.delete(`apiproducts/${id}`),
};

export default Admins;
