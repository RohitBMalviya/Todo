import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./store/store";
import App from "./App.jsx";
import "./global.css";
import {
  Login,
  Register,
  Profile,
  YourTodo,
  ForgotPassword,
  ResetPassword,
  VerifyUser,
} from "./pages/index.jsx";
import PrivateRoute from "./services/isauthorized.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <YourTodo />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Register />} />
      <Route path="/users/verify-user" element={<VerifyUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/users/reset-password" element={<ResetPassword />} />
    </Route>
  )
);

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
