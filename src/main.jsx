import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ColorSchemeProvider } from "@mantine/styles";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export function Root() {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () =>
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications position="top-center" zIndex={2077} />
        <BrowserRouter>
          <AuthProvider>
            <App
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const container = document.getElementById("root");

// Create the root only once (important for HMR in dev)
if (!window._root) {
  window._root = ReactDOM.createRoot(container);
}

window._root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
