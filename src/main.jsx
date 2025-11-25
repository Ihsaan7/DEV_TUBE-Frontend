import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";

// Security wrapper to enforce HTTPS
const SecurityWrapper = ({ children }) => {
  useEffect(() => {
    // Force HTTPS in production
    if (
      window.location.protocol !== "https:" &&
      import.meta.env.PROD &&
      window.location.hostname !== "localhost"
    ) {
      window.location.href = `https://${window.location.hostname}${window.location.pathname}${window.location.search}`;
    }
  }, []);

  return children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SecurityWrapper>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </SecurityWrapper>
  </StrictMode>
);
