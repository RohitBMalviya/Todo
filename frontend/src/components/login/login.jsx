import { Container, CustomButton, InputField, TextLabel } from "../index.jsx";
import IMG from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth.service.js";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

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
      const response = await authService.login({
        email: UserForm.email,
        password: UserForm.password,
      });
      if (response) {
        localStorage.setItem("token", true);
        setuserForm(UserForm);
        const indentUrl = localStorage.getItem("indentUrl");
        console.log(indentUrl);
        if (indentUrl) {
          navigate(`${indentUrl}`);
          localStorage.removeItem("indentUrl");
        } else {
          navigate("/");
        }
      }
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
        <h2 className="text-4xl font-bold text-slate-50 mt-[6.75rem]">Login</h2>
        <h3 className="text-2xl font-bold text-slate-50 mb-4">
          Welcome Back !
        </h3>
        <form
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 xl:w-[60%] w-[90%] mb-24"
          onSubmit={handleSumbit}
        >
          <TextLabel htmlFor={"email"} className={""} text={"Email :"} />
          <InputField
            className="mt-3"
            name="email"
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={UserForm.email}
            onChange={handleInputChange}
          />
          <TextLabel
            htmlFor={"password"}
            className={"mt-6"}
            text={" Password :"}
          />
          <div className="w-full relative">
            <InputField
              className="mt-3"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              type={viewPassword ? "password" : "text"}
              value={UserForm.password}
              onChange={handleInputChange}
            />
            <CustomButton
              className={"absolute right-1 top-5 p-2 xl:text-base text-sm"}
              text={
                viewPassword ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )
              }
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
            />
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
          <CustomButton
            className={"w-full p-2 sm:text-2xl text-xl mt-6"}
            text={"Login"}
            type="submit"
          />
          <p className="lg:text-xl md:text-base text-sm font-medium mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
