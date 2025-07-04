import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "dark");

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App toggleMode={toggleMode} />
        <ToastContainer position="top-right" autoClose={3000} limit={3} />
      </AuthProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
