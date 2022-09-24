import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/layout/App";
import "react-toastify/dist/ReactToastify.css";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";

import { StoreProvider } from "./app/context/StroeContext";
import { Provider } from "react-redux";
import { store } from "./app/store/store.config";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProductsAsync } from "./app/store/catalog.slice";

export const history = createBrowserHistory({ window });

store.dispatch(fetchProductsAsync());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <StoreProvider>
        <App />
        <ToastContainer />
      </StoreProvider>
    </Provider>
  </HistoryRouter>
);
