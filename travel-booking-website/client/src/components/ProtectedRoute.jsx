import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const check = localStorage.getItem("userToken");

  if (!check) {
    return <Navigate to="/" replace />;
  }

  return children;
}
