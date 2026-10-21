import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Public/Home";

const publicPages = [
  {
    path: "/",
    element: <Home />,
  },
];

export default function App() {
  return (
    <Routes>
      {publicPages.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        ></Route>
      ))}
    </Routes>
  );
}
