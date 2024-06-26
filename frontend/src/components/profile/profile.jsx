import { useEffect, useState } from "react";
import IMG from "../../assets/images/profile.avif";
import authService from "../../services/auth.service.js";
import {
  Container,
  CustomButton,
  UpdatePassword,
  InputField,
  TextLabel,
} from "../index.jsx";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa6";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    birthDay: "",
    gender: "",
    address: "",
  });
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateEmailEnable, setUpdateEmailEnable] = useState(true);
  const [updatePassword, setUpdatePassword] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await authService.getUserDetail();
      setUserData(response.data?.data);
      setUpdateEmail(response.data?.data.email);
    })();
  }, [setUserData, setUpdateEmail]);
  const handleInputField = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleUpdateEmailSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.updateEmail({ email: updateEmail });
      if (response) {
        alert("Email Updated Verify email check");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleUpdateSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.updateUserDetail({
        username: userData.username,
        gender: userData.gender,
        address: userData.address,
        birthDay: userData.birthDay,
      });
      if (response) {
        alert("User detail Update");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDelete = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.deleteAccount();
      if (response) {
        navigate("/signup");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Container
      className={"flex justify-center items-center w-full h-full bg-[#FDFFE2]"}
    >
      <div className="sm:flex hidden w-5/12 justify-center">
        <img src={IMG} alt="-" />
      </div>
      <div className="sm:w-7/12 w-full h-full bg-[#83B4FF] flex flex-col gap-4 items-center justify-center py-6">
        <h2 className="text-4xl font-bold text-slate-50 mt-24">Profile</h2>
        <form
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 sm:w-[70%] w-[90%]"
          onSubmit={
            updateEmailEnable ? handleUpdateSubmit : handleUpdateEmailSubmit
          }
        >
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"username"} text={"Username :"} />
            <InputField
              type="text"
              id="username"
              className="xl:w-3/5 w-full"
              value={userData.username}
              onChange={handleInputField}
              disabled={!updateEmailEnable}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <span className="flex justify-between w-full">
              <TextLabel htmlFor={"email"} text={"Email :"} />
              <CustomButton
                type="button"
                text={<FaPen />}
                className={"p-2"}
                onClick={() => setUpdateEmailEnable(!updateEmailEnable)}
              />
            </span>
            <InputField
              type="email"
              id="email"
              className="xl:w-3/5 w-full "
              value={updateEmail}
              onChange={(event) => {
                setUpdateEmail(event.target.value);
              }}
              disabled={updateEmailEnable}
            />
          </div>
          {/* // Todo Phone Number */}
          {/* <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"phone"}  text={"Mobile No:"} />
            <div className="flex xl:flex-row flex-col xl:items-center items-start gap-4 xl:w-3/5 w-full">
              <InputField type="number" id="phone" className="xl:w-4/5 " />
              <CustomButton
                className={"xl:w-[30%] w-2/5 h-12 xl:text-2xl text-xl px-2"}
                text={"Verify"}
              />
            </div>
          </div> */}
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"birthDay"} text={"Birth Date :"} />
            <InputField
              type="date"
              id="birthDay"
              name="birthDay"
              className="xl:w-3/5 w-full "
              placeholder="Enter your birth date"
              value={userData.birthDay}
              onChange={handleInputField}
              disabled={!updateEmailEnable}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel
              htmlFor={"gender"}
              className={"mt-6"}
              text={"Gender :"}
            />
            <select
              name="gender"
              id="gender"
              className="rounded-xl h-12 xl:text-xl text-lg p-2 font-semibold xl:w-3/5 w-full"
              value={userData.gender}
              onChange={handleInputField}
              disabled={!updateEmailEnable}
            >
              <option value="default">------</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"address"} text={"Address :"} />
            <textarea
              name="address"
              id="address"
              className="rounded-xl xl:text-xl text-lg p-2 font-semibold xl:w-3/5 w-full h-32"
              value={userData.address}
              onChange={handleInputField}
              disabled={!updateEmailEnable}
            />
          </div>
          <div className="flex justify-end items-center w-full gap-5">
            <CustomButton
              className={"px-4 py-2 xl:text-2xl text-xl"}
              text={"Save"}
            />
          </div>
        </form>
        <div className="flex  flex-col gap-4 justify-around sm:w-[70%] w-[90%]">
          <div className="flex justify-between">
            <h3 className="sm:text-2xl text-xl font-medium">
              To update password?
            </h3>
            <CustomButton
              className={"xl:px-3 p-2 xl:text-xl text-xl"}
              text={"Update Password"}
              onClick={() => {
                setUpdatePassword(!updatePassword);
              }}
            />
          </div>
          <div className="flex justify-between">
            <h3 className="sm:text-2xl text-xl font-medium">Delete Account?</h3>
            <CustomButton
              className={"xl:px-3 p-2 xl:text-xl text-xl"}
              text={"Delete Account"}
              onClick={handleDelete}
            />
          </div>
        </div>
        {updatePassword && (
          <div className="absolute top-[4.5rem] left-0 w-full h-full">
            <UpdatePassword
              updatePassword={updatePassword}
              setUpdatePassword={setUpdatePassword}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
