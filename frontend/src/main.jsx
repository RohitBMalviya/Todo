import React from "react";
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
import { Login, Register, Profile, YourTodo } from "./pages/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/your-todo" element={<YourTodo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Route>
  )
);

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
