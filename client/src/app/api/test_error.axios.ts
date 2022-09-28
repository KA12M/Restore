import { req } from "./agent";

const TestError = {
  get400Error: () => req.get("buggy/GetBadRequest"),
  get401Error: () => req.get("buggy/GetUnAuthorized"),
  get404Error: () => req.get("Buggy/GetNotFound"),
  get500Error: () => req.get("buggy/GetServerError"),
  getValidationError: () => req.get("buggy/GetValidationError"),
};

export default TestError;
