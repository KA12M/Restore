import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/layout/App";
import "react-toastify/dist/ReactToastify.css";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "./app/context/StroeContext";

export const history = createBrowserHistory({ window });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider >
      <HistoryRouter history={history}>
        <App />
        <ToastContainer />
      </HistoryRouter>
    </StoreProvider>
  </React.StrictMode>
);
