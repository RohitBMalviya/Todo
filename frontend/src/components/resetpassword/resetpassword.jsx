import { Container, CustomButton, InputField, TextLabel } from "../index";
import authService from "../../services/auth.service";
import { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [hashToken] = useSearchParams();
  const token = hashToken.get("token");
  console.log(token);
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    new_password: "",
    new_confirm_password: "",
  });
  const [viewPassword, setViewPassword] = useState(true);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };
  const handleSumbit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.resetPassword({
        password: password.new_password,
        confirm_password: password.new_confirm_password,
        token,
      });
      if (response) {
        alert("Password change");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container
      className={
        "w-full h-[55rem] flex flex-col justify-center items-center bg-[#FDFFE2]"
      }
    >
      <h3 className="text-4xl font-bold text-black mb-4">Reset Password</h3>
      <form
        className=" bg-[#83B4FF] p-4 rounded-3xl space-y-4"
        onSubmit={handleSumbit}
      >
        <div className="w-full relative">
          <TextLabel htmlFor={"new_password"} text={"Password :"} />
          <InputField
            className={"mt-3"}
            placeholder="Enter Your New Password"
            name="new_password"
            type={viewPassword ? "password" : "text"}
            id="new_password"
            value={password.new_password}
            onChange={handleInputChange}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
            title="Must contain at least one number and one uppercase and lowercase letter, special character, and at least 8 or more characters"
          />
          <CustomButton
            className={"absolute right-1 top-14 p-2 xl:text-base text-sm"}
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
        <div className="w-full relative">
          <TextLabel
            htmlFor={"new_confirm_Password"}
            text={"Confirm Password :"}
          />
          <InputField
            className={"mt-3"}
            placeholder="Enter Your New Confirm Password"
            name="new_confirm_password"
            type={viewPasswordConfirm ? "password" : "text"}
            id="new_confirm_password"
            value={password.new_confirm_password}
            onChange={handleInputChange}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
            title="Must contain at least one number ,one uppercase, one lowercase letter, special character, and at least 8 or more characters"
          />

          <CustomButton
            className={"absolute right-1 top-14 p-2 xl:text-base text-sm"}
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
        <div className="flex w-full justify-end gap-4">
          <CustomButton
            type={"button"}
            className={"p-4 xl:text-xl text-lg"}
            text={"Clear"}
            onClick={() =>
              setPassword({ new_password: "", new_confirm_password: "" })
            }
          />
          <CustomButton
            type={"sumbit"}
            className={"p-4 xl:text-xl text-lg"}
            text={"Sumbit"}
          />
        </div>
      </form>
    </Container>
  );
}
