import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./components/index.jsx";
export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
