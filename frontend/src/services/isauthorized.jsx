import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthorized = false;
  return isAuthorized ? { children } : <Navigate to="/login" />;
}
