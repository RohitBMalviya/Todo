import { useEffect, useState } from "react";
import IMG from "../../assets/images/profile.avif";
import authService from "../../services/auth.service.js";
import { Container, CustomButton, InputField, TextLabel } from "../index.jsx";

export default function Profile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      const response = await authService.getUserDetail();
      setUserData(response.data?.data);
    })();
  }, [setUserData]);
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
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 sm:w-[70%] w-[90%]"
        >
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel
              htmlFor={"username"}
              className={""}
              text={"Username :"}
            />
            <InputField
              type="text"
              id="username"
              className="xl:w-3/5 w-full "
              // value={userData.username}
              defaultValue={userData.username}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"email"} className={""} text={"Email :"} />
            <InputField
              type="email"
              id="email"
              className="xl:w-3/5 w-full "
              // value={userData.email}
              defaultValue={userData.email}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"phone"} className={""} text={"Mobile No:"} />
            <div className="flex xl:flex-row flex-col xl:items-center items-start gap-4 xl:w-3/5 w-full">
              <InputField type="text" id="phone" className="xl:w-4/5 " />
              <CustomButton
                className={"xl:w-[30%] w-2/5 p-2 h-10 xl:text-xl text-xl"}
                text={"Verify"}
              />
            </div>
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel
              htmlFor={"birthdate"}
              className={""}
              text={"Birth Date :"}
            />
            <InputField
              type="date"
              id="birthdate"
              className="xl:w-3/5 w-full "
              placeholder="Enter your birth date"
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
              className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full"
            >
              <option value="default">------</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <TextLabel htmlFor={"address"} className={""} text={"Address :"} />
            <textarea
              name="address"
              id="address"
              className="rounded-xl xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full h-32"
            />
          </div>
          <div className="flex justify-end items-center w-full gap-5">
            <CustomButton
              className={"px-4 py-2 xl:text-2xl text-xl"}
              text={"Clear"}
            />
            <CustomButton
              className={"px-4 py-2 xl:text-2xl text-xl"}
              text={"Update"}
            />
          </div>
        </form>
        <div className="flex  justify-around items-center w-full mb-16">
          <h3 className="sm:text-2xl text-xl font-medium ">
            To update password?
          </h3>
          <CustomButton
            className={"xl:px-3 p-2 xl:text-2xl text-xl"}
            text={"Click here"}
          />
        </div>
      </div>
    </Container>
  );
}
