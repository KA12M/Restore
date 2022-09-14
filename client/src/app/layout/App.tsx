import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header"; 
import Catalog from "../../components/catalog/Catalog";
import HomePage from "../../components/home/HomePage";
import ContactPage from "./../../components/contact/ContactPage";
import AboutPage from "../../components/about/AboutPage";
import ProductDetail from './../../components/catalog/ProductDetail';
import NotFound from './../errors/NotFound';
import ServerError from "../errors/ServerError";

const App = () => {
  const [themeMode, setThemeMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  const handleTheme = () => setThemeMode(!themeMode);

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
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </Container>
    </ThemeProvider>
  );
};

export default App;
