import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DarkModeProvider from "./context/DarkModeContext.jsx";

import App from "./App.jsx";

import "./config/i18n.js";

import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </UserProvider>
  </BrowserRouter>
);
