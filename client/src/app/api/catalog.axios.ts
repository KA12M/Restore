import { req } from "./agent";

const Catalog = {
  list: (params: URLSearchParams) => req.get("ApiProducts", params),
  details: (id: number) => req.get(`ApiProducts/${id}`),
  fetchFilters: () => req.get("ApiProducts/GetFilters"),
};

export default Catalog;
