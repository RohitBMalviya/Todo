import React from "react";
import Logo from "../../assets/images/todo.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      authService.logout();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <nav className="flex fixed sm:justify-around justify-between items-center p-3 bg-[#5A72A0] w-full">
      <div className="flex flex-1 items-center justify-around">
        <div className="flex bg-white rounded-2xl p-1 px-4 ">
          <img src={Logo} alt="logo" className="w-10" />
          <h1 className="text-4xl font-bold ">Todo</h1>
        </div>
        <div className="md:flex hidden">
          <input
            type="search"
            name="search"
            id="search"
            className="rounded-xl h-12 w-[30rem] text-3xl font-semibold px-4"
          />
        </div>
      </div>
      <div className="xl:flex flex-1 hidden justify-center">
        <menu className="flex gap-10 text-2xl text-white font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={"/your-todo"}>Your Todo</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </menu>
      </div>
      <div className="xl:hidden flex">==</div>
    </nav>
  );
}
