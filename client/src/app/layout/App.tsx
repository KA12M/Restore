import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
};

export default App;
