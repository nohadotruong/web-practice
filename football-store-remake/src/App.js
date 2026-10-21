import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import UserContext from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/public/LandingPage/LandingPage";
import Store from "./pages/public/Store/Store";
import Product from "./pages/public/Product/Product";

import Authentication from "./pages/account/Authentication/Authentication";

import Profile from "./pages/account/Profile/Profile";
import Cart from "./pages/account/Cart/Cart";
import Order from "./pages/account/Order/Order";

import ProductManagement from "./pages/admin/ProductManagement/ProductManagement";

const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/product",
    element: <Product />,
  },
];

const accountRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
];

const adminRoutes = [
  {
    path: "/product_management",
    element: <ProductManagement />,
  },
];

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [user]);

  const userCtxValue = useMemo(
    () => ({ user, setUser }),
    [user]
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/authentication"
          element={<Authentication />}
        />
        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          ></Route>
        ))}
        {accountRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          ></Route>
        ))}
        {adminRoutes.map(({ path, element }) => (
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
    </UserContext.Provider>
  );
}
