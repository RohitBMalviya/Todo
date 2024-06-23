import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  localStorage.setItem("indentUrl", location.pathname);
  const isAuthorized = localStorage.getItem("token");
  if (isAuthorized) {
    localStorage.removeItem("indentUrl");
  }

  return isAuthorized ? <div>{children}</div> : <Navigate to="/login" />;
}
