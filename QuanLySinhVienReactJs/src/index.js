import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
