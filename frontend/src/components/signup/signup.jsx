import { Container, CustomButton, InputField, TextLabel } from "../index.jsx";
import IMG from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth.service.js";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

export default function Register() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [viewPassword, setViewPassword] = useState(true);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };
  const handleSumbit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.signUp({
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        confirm_password: userForm.confirm_password,
      });
      if (response) {
        alert("Check Mail");
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
      <div className="sm:w-1/2 w-full h-full bg-[#83B4FF] flex flex-col gap-4 items-center justify-center ">
        <h2 className="text-4xl font-bold text-slate-50 mt-28">SignUp</h2>
        <h3 className="text-2xl font-bold text-slate-50 mb-4">
          Create Your Account
        </h3>
        <form
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 xl:w-[65%] w-[90%] mb-16"
          onSubmit={handleSumbit}
        >
          <TextLabel htmlFor={"username"} className={""} text={" Username :"} />
          <InputField
            className="mt-3"
            placeholder="Enter Your Username"
            name="username"
            type="text"
            id="username"
            value={userForm.username}
            onChange={handleInputChange}
          />
          <TextLabel htmlFor={"email"} className={"mt-6"} text={"Email :"} />
          <InputField
            className="mt-3"
            placeholder="Enter Your Email"
            name="email"
            type="email"
            id="email"
            value={userForm.email}
            onChange={handleInputChange}
          />
          <TextLabel
            htmlFor={"password"}
            className={"mt-6"}
            text={"Password :"}
          />
          <div className="w-full relative">
            <InputField
              className="mt-3"
              placeholder="Enter Your Password"
              name="password"
              type={viewPassword ? "password" : "text"}
              id="password"
              value={userForm.password}
              onChange={handleInputChange}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
              title="Must contain at least one number and one uppercase and lowercase letter, special character, and at least 8 or more characters"
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
          <TextLabel
            htmlFor={"confirm_Password"}
            className={"mt-6"}
            text={"Confirm Password :"}
          />
          <div className="w-full relative">
            <InputField
              className="mt-3"
              placeholder="Enter Your Confirm Password"
              name="confirm_password"
              type={viewPasswordConfirm ? "password" : "text"}
              id="confirm_password"
              value={userForm.confirm_password}
              onChange={handleInputChange}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
              title="Must contain at least one number ,one uppercase, one lowercase letter, special character, and at least 8 or more characters"
            />

            <CustomButton
              className={"absolute right-1 top-5 p-2 xl:text-base text-sm"}
              text={
                viewPasswordConfirm ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )
              }
              type="button"
              onClick={() => setViewPasswordConfirm(!viewPasswordConfirm)}
            />
          </div>
          <CustomButton
            className={"w-full p-2 sm:text-2xl text-xl mt-6"}
            text={"Sign Up"}
            type="submit"
          />

          <p className="lg:text-xl md:text-base text-sm font-medium mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
