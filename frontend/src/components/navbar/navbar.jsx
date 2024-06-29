import React, { useState } from "react";
import Logo from "../../assets/images/todo.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { InputField } from "../index";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      if (response) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const token = localStorage.getItem("token");
  return (
    <div className="relative z-10">
      <nav className="flex fixed sm:justify-around justify-between items-center p-3 bg-[#5A72A0] w-full">
        <Link to={"/"} className="flex bg-white rounded-2xl p-1 px-4 ">
          <img src={Logo} alt="logo" className="w-10" />
          <h1 className="text-4xl font-bold ">Todo</h1>
        </Link>
        <div className="md:flex hidden w-[32rem] relative">
          <FaSearch className="absolute top-3.5 left-2.5 " size={20} />
          <InputField
            type="search"
            name="search"
            id="search"
            placeholder="Search Todo"
            className="text-3xl px-4 pl-10"
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
            {token ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>SignUp</Link>
                </li>
              </>
            )}
          </menu>
        </div>
        <div className="xl:hidden flex">
          <TiThMenu size={22} onClick={() => setShowMenu(!showMenu)} />
        </div>
      </nav>
      {showMenu && (
        <div className="flex xl:hidden justify-end fixed z-10 right-0 h-screen w-full backdrop-blur-sm">
          <div className="md:w-1/2 w-2/3 bg-[#5A72A0] h-screen p-6">
            <div className="flex justify-end">
              <ImCross
                className=""
                size={22}
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
            <menu className="flex flex-col gap-10 text-2xl text-white font-medium mt-8">
              <li onClick={() => setShowMenu(false)}>
                <Link to="/">Home</Link>
                <hr />
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link to={"/profile"}>Profile</Link>
                <hr />
              </li>
              {token ? (
                <li onClick={() => setShowMenu(false)}>
                  <button onClick={handleLogout}>Logout</button>
                  <hr />
                </li>
              ) : (
                <>
                  <li onClick={() => setShowMenu(false)}>
                    <Link to={"/login"}>Login</Link>
                    <hr />
                  </li>
                  <li onClick={() => setShowMenu(false)}>
                    <Link to={"/signup"}>SignUp</Link>
                    <hr />
                  </li>
                </>
              )}
            </menu>
          </div>
        </div>
      )}
    </div>
  );
}
