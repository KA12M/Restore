import React, { useCallback, useEffect, useState } from "react";
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
import LoadingComponent from "./LoadingComponent";
import BasketPage from "../../components/basket/basketPage"; 
import { useAppSelector, useAppDispatch } from "../store/store.config";
import { fetchBasketAsync } from "../store/basket.slice";
import Login from "../../components/account/login";
import Register from "../../components/account/register";
import { fetchCurrentUser } from "../store/account.slice";
import { PrivateLogin, PrivateRoute } from "./PrivateRoute";
import OrderPage from "../../components/order/orderPage";
import CheckoutWrapper from '../../components/checkout/CheckoutWrapper';
import Inventory from "../../components/admin/inventory";

const App = () => {
  // from useStoreContext();
  // const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { fullscreen } = useAppSelector((state) => state.screen);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [themeMode, setThemeMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  const handleTheme = () => setThemeMode(!themeMode);

  const MainRoute = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<ProductDetail />} />
      <Route path="/basketpage" element={<BasketPage />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<PrivateRoute />}>
        <Route path="/checkout" element={<CheckoutWrapper />} />
        <Route path="/order" element={<OrderPage/>}/> 
      </Route>
      <Route element={<PrivateRoute roles={['Admin']}/>}> 
        <Route path="/inventory" element={<Inventory />}/>
      </Route>
      
      <Route
        path="/login"
        element={
          <PrivateLogin>
            <Login />
          </PrivateLogin>
        }
      />
    </Routes>
  );

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleMode={handleTheme} themeMode={themeMode} />

      {fullscreen ? (
        <>{MainRoute}</>
      ) : (
        <Container sx={{ marginTop: 10 }}>{MainRoute}</Container>
      )}
    </ThemeProvider>
  );
};

export default App;
