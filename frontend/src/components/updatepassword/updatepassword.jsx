import { Container, CustomButton, InputField, TextLabel } from "../index";
import { ImCross } from "react-icons/im";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import authService from "../../services/auth.service";
import { useState } from "react";

export default function UpdatePassword({ updatePassword, setUpdatePassword }) {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    new_confirm_password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };
  const [oldViewPassword, setOldViewPassword] = useState(true);
  const [newViewPassword, setNewViewPassword] = useState(true);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(true);
  const handleSumbit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.updatePassword({
        password: password.old_password,
        newpassword: password.new_password,
        confirm_password: password.new_confirm_password,
      });
      if (response) {
        alert("update Password");
        setUpdatePassword(!updatePassword);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container
      className={
        "flex justify-center items-center w-full xl:h-[60rem] sm:h-[84rem] h-[80rem] backdrop-blur-2xl backdrop-contrast-75"
      }
    >
      <div className=" bg-[#83B4FF] p-4 rounded-3xl flex flex-col ">
        <div className=" flex justify-between mx-1">
          <h2 className="xl:text-4xl text-3xl font-bold my-2">
            Create Your Todo
          </h2>
          <button onClick={() => setUpdatePassword(!updatePassword)}>
            <ImCross className="" size={20} />
          </button>
        </div>
        <hr />
        <form
          className=" bg-[#83B4FF] p-4 rounded-3xl space-y-4"
          onSubmit={handleSumbit}
        >
          <div className="w-full relative">
            <TextLabel htmlFor={"old_password"} text={"Old Password :"} />
            <InputField
              className={"mt-3"}
              placeholder="Enter Your Old Password"
              name="old_password"
              type={oldViewPassword ? "password" : "text"}
              id="old_password"
              value={password.old_password}
              onChange={handleInputChange}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
              title="Must contain at least one number and one uppercase and lowercase letter, special character, and at least 8 or more characters"
            />
            <CustomButton
              className={"absolute right-1 top-14 p-2 xl:text-base text-sm"}
              text={
                oldViewPassword ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )
              }
              type="button"
              onClick={() => setOldViewPassword(!oldViewPassword)}
            />
          </div>
          <div className="w-full relative">
            <TextLabel htmlFor={"new_password"} text={"New Password :"} />
            <InputField
              className={"mt-3"}
              placeholder="Enter Your New Password"
              name="new_password"
              type={newViewPassword ? "password" : "text"}
              id="new_password"
              value={password.new_password}
              onChange={handleInputChange}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
              title="Must contain at least one number and one uppercase and lowercase letter, special character, and at least 8 or more characters"
            />
            <CustomButton
              className={"absolute right-1 top-14 p-2 xl:text-base text-sm"}
              text={
                newViewPassword ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )
              }
              type="button"
              onClick={() => setNewViewPassword(!newViewPassword)}
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
                setPassword({
                  old_password: "",
                  new_password: "",
                  new_confirm_password: "",
                })
              }
            />
            <CustomButton
              type={"sumbit"}
              className={"p-4 xl:text-xl text-lg"}
              text={"Sumbit"}
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
