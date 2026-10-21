import React from "react";
import { Routes, Route, Router } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./views/LandingPage/LandingPage";
import Shop from "./views/Shop/Shop";
import Authentication from "./views/Authentication/Authentication";
import ProductManager from "./views/Manager/ProductManager/ProductManager";

const unProtectedRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/auth", element: <Authentication /> },
  { path: "/shop", element: <Shop /> },
];

const protectedRoutes = [
  { path: "/product_manager", element: <ProductManager /> },
];

export default function App() {
  return (
    <Routes>
      {unProtectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        ></Route>
      ))}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <MainLayout>{element}</MainLayout>
            </ProtectedRoute>
          }
        ></Route>
      ))}
    </Routes>
  );
}
