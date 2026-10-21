import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./views/Login/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import UserManager from "./views/UserManager/UserManager";
import AdministrativeClassManager from "./views/AdministrativeClass/AdministrativeClass";
import MajorClassManager from "./views/MajorClassManager/MajorClassManager";
import FacultyManager from "./views/FacultyManager/FacultyManager";
import CourseManager from "./views/CourseManager/CourseManager";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

const protectedRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/user_manager", element: <UserManager /> },
  { path: "/student_manager", element: <UserManager /> },
  {
    path: "/administrative_class_manager",
    element: <AdministrativeClassManager />,
  },
  {
    path: "/major_class_manager",
    element: <MajorClassManager />,
  },
  { path: "/faculty_manager", element: <FacultyManager /> },
  { path: "/course_manager", element: <CourseManager /> },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <MainLayout>{element}</MainLayout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
}
