import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
 
import Header from "./Header"; 
import Catalog from "../../features/catalog/Catalog";
import HomePage from "../../features/home/HomePage";
import ContactPage from "./../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetail from './../../features/catalog/ProductDetail';

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
        </Routes> 
      </Container>
    </ThemeProvider>
  );
};

export default App;
