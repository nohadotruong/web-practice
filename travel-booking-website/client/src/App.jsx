import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./views/Public/Home";
import Authentication from "./views/Public/Authentication";
import ProfileManagement from "./views/Customer/ProfileManagement";

import ProtectedRoute from "./components/ProtectedRoute";

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
];

const customerRoutes = [
  {
    path: "/profile",
    element: <ProfileManagement />,
  },
];

export default function App() {
  return (
    <Routes>
      <Route
        path="/authentication"
        element={<Authentication />}
      ></Route>

      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        ></Route>
      ))}

      {customerRoutes.map(({ path, element }) => (
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
