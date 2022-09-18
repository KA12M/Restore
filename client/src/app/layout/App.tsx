import React, { useEffect, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Catalog from "../../components/catalog/Catalog";
import HomePage from "../../components/home/HomePage";
import ContactPage from "./../../components/contact/ContactPage";
import AboutPage from "../../components/about/AboutPage";
import ProductDetail from "./../../components/catalog/ProductDetail";
import NotFound from "./../errors/NotFound";
import ServerError from "../errors/ServerError";
import { useStoreContext } from "../context/StroeContext";
import { getCookie } from "../utility/uitl";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import BasketPage from "../../components/basket/basketPage";
import CheckoutPage from "../../components/checkout/checkoutPage";

const App = () => {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.getBasket()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [setBasket]);

  const [themeMode, setThemeMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  const handleTheme = () => setThemeMode(!themeMode);

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleMode={handleTheme} themeMode={themeMode} />

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} /> 
          <Route path="/basketpage" element={<BasketPage />} /> 
          <Route path="/checkout" element={<CheckoutPage />} /> 
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
