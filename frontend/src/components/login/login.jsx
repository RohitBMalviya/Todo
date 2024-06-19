import { Container } from "../index.jsx";
import IMG from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth.service.js";

export default function Login() {
  const navigate = useNavigate();
  const [UserForm, setuserForm] = useState({
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setuserForm({ ...UserForm, [name]: value });
  };
  const handleSumbit = async (event) => {
    try {
      event.preventDefault();
      await authService.login({
        email: UserForm.email,
        password: UserForm.password,
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Container
      className={"flex justify-center items-center w-full h-full bg-[#FDFFE2]"}
    >
      <div className="sm:flex hidden w-1/2 justify-center">
        <img src={IMG} alt="-" />
      </div>
      <div className="sm:w-1/2 w-full h-full bg-[#83B4FF] flex flex-col gap-2 items-center justify-center">
        <h2 className="text-4xl font-bold text-slate-50 mt-32">Login</h2>
        <h3 className="text-2xl font-bold text-slate-50 mb-4">
          Welcome Back !
        </h3>
        <form
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 xl:w-[60%] w-[90%] mb-12"
          onSubmit={handleSumbit}
        >
          <label htmlFor="email" className="sm:text-3xl text-2xl font-medium">
            Email:
          </label>
          <input
            className="rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium mt-3"
            name="email"
            type="email"
            id="email"
            value={UserForm.email}
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="password"
            className="sm:text-3xl text-2xl font-medium mt-6"
          >
            Password:
          </label>
          <div className="w-full relative">
            <input
              className="rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium mt-3 "
              name="password"
              type={viewPassword ? "password" : "text"}
              id="password"
              value={UserForm.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute right-1 top-4 rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 font-semibold text-white"
            >
              {viewPassword ? "view" : "hide"}
            </button>
          </div>
          <div className="flex justify-between items-center w-full mt-6">
            <span className="flex items-center">
              <input type="checkbox" name="default" className="w-4 h-4" />
              &nbsp;
              <span className="lg:text-xl md:text-base text-sm font-medium">
                RememberMe
              </span>
            </span>
            <Link
              to="#"
              className="lg:text-xl md:text-base text-sm font-medium text-white"
            >
              ForgotPassword?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 sm:text-2xl text-xl font-semibold text-white mt-6"
          >
            Login
          </button>
          <p className="lg:text-xl md:text-base text-sm font-medium mt-6">
            Don't have an account?
            <Link to="/signup" className="text-white">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
