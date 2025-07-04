// src/theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#00bcd4" },
      secondary: { main: "#ff4081" },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f5f5f5",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
    typography: {
      fontFamily: `"Poppins", "Roboto", "sans-serif"`,
    },
    shape: {
      borderRadius: 16,
    },
    shadows: Array(25).fill("0 4px 12px rgba(0,0,0,0.1)"),
  });

export default getTheme;
