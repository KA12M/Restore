import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";

import Header from "./Header";
import Catalog from "../../features/catalog/Catalog"; 

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
        <Catalog />
      </Container>
    </ThemeProvider>
  );
};

export default App;
