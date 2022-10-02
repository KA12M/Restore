import { req } from "./agent";

const Account = {
  login: (values: any) => req.post("apiaccounts/login", values),
  register: (values: any) => req.post("apiaccounts/register", values),
  currentUser: () => req.get("apiaccounts/currentUser"),
  fetchAddress: () => req.get('apiaccounts/savedAddress')
};

export default Account;
