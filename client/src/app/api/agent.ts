import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import { history } from "../../main";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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

const requests = {
  get: (url: string) => axios.get(url).then(ResponseBody),
};

const Catalog = {
  list: () => requests.get("ApiProducts"),
  details: (id: number) => requests.get(`ApiProducts/${id}`),
};

const TestError = {
  get400Error: () => requests.get("buggy/GetBadRequest"),
  get401Error: () => requests.get("buggy/GetUnAuthorized"),
  get404Error: () => requests.get("Buggy/GetNotFound"),
  get500Error: () => requests.get("buggy/GetServerError"),
  getValidationError: () => requests.get("buggy/GetValidationError"),
};

export default {
  Catalog,
  TestError,
};
