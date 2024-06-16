import React from "react";
import Logo from "../../assets/images/todo.png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="flex sm:flex-row flex-col gap-10 justify-around sm:items-center items-start p-6 bg-[#5A72A0]">
      <div className="flex bg-white rounded-2xl p-2 px-4">
        <img src={Logo} alt="logo" className="w-10" />
        <h1 className="text-4xl font-bold ">Todo</h1>
      </div>
      <menu className="flex flex-col gap-2 text-xl text-white font-medium">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/your-todo"}>Your Todo</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
      </menu>
      <div className=" text-xl text-white font-medium">
        <address>
          Bharat,Maharashtra,Pune
          <br />
          pincode : 412115
        </address>
        Email :
        <a href="mailto:rohitmalviyab@gmail.com"> rohitbmalviyab@gmail.com</a>
      </div>
    </footer>
  );
}
