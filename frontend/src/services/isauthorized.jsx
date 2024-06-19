import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthorized = true;
  return isAuthorized ? <div>{children}</div> : <Navigate to="/login" />;
}
