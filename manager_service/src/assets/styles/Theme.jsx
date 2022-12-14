import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#080b28",
    secondary: "#272e70",
    accent: "#AFDBD2",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
