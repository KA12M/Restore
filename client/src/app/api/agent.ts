import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import { history } from "../../main";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;          

axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const ResponseBody = (res: any) => res.data;

axios.interceptors.response.use(
  async (res) => {
    await sleep();
    return res;
  },
  (err: AxiosError) => {
    var data = err.response?.data;
    var json = JSON.stringify(data);
    var result = JSON.parse(json);

    switch (result.status) {
      case 400:
        if (result.errors) {
          const modelStateErrors: string[] = [];
          for (const key in result.errors)
            if (result.errors[key]) modelStateErrors.push(result.errors[key]);
          throw modelStateErrors.flat();
        }
        toast.error(result.title);
        break;
      case 401:
        toast.error(result.title);
        break;
      case 404:
        toast.error(result.title);
        break;
      case 500:
        toast.error(result.title);
        history.push("/server-error", { state: result });
        break;
      default:
        break;
    }
  }
);

const req = {
  get: (url: string) => axios.get(url).then(ResponseBody),
  post: (url: string, body: object = {}) => axios.post(url, body).then(ResponseBody),
  delete: (url: string) => axios.delete(url).then(ResponseBody),
};

const Catalog = {
  list: () => req.get("ApiProducts"),
  details: (id: number) => req.get(`ApiProducts/${id}`),
};

const Basket = {
  getBasket: () => req.get("ApiBasket/GetBasket"),
  addBasket: (productId: number, quantity: number = 1) => 
    req.post(`ApiBasket/AddItemToBasket?productId=${productId}&quantity=${quantity}`),
  removeBasket: (productId: number, quantity: number = 1) => 
    req.delete(`ApiBasket/RemoveBasketItem?productId=${productId}&quantity=${quantity}`)
}

const TestError = {
  get400Error: () => req.get("buggy/GetBadRequest"),
  get401Error: () => req.get("buggy/GetUnAuthorized"),
  get404Error: () => req.get("Buggy/GetNotFound"),
  get500Error: () => req.get("buggy/GetServerError"),
  getValidationError: () => req.get("buggy/GetValidationError"),
};

export default {
  Catalog,
  TestError,
  Basket
};
