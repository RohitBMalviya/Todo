import React from "react";
import Logo from "../../assets/images/todo.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { InputField } from "../index";

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
    <nav className="flex fixed sm:justify-around justify-between  items-center p-3 bg-[#5A72A0] w-full">
      <Link to={"/"} className="flex bg-white rounded-2xl p-1 px-4 ">
        <img src={Logo} alt="logo" className="w-10" />
        <h1 className="text-4xl font-bold ">Todo</h1>
      </Link>
      <div className="md:flex hidden w-[32rem]">
        <InputField
          type="search"
          name="search"
          id="search"
          placeholder="Search Todo"
          className="text-3xl px-4"
        />
      </div>
      <div className="xl:flex hidden justify-center">
        <menu className="flex gap-10 text-2xl text-white font-medium">
          <li>
            <Link to="/">Home</Link>
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
