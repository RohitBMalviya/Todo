import { useEffect, useState } from "react";
import IMG from "../../assets/images/profile.avif";
import { getUserDetail } from "../../services/auth.service.js";
import { Container } from "../index.jsx";

export default function Profile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      const response = await getUserDetail();
      setUserData(response.data?.data);
    })();
  }, [setUserData]);
  return (
    <Container
      className={
        "flex justify-center items-center w-full h-full pt-20 bg-[#FDFFE2]"
      }
    >
      <div className="sm:flex hidden w-1/2 justify-center">
        <img src={IMG} alt="-" />
      </div>
      <div className="sm:w-1/2 w-full h-full bg-[#83B4FF] flex flex-col gap-4 items-center justify-center py-6">
        <h2 className="text-4xl font-bold text-slate-50 mb-4">Profile</h2>
        <form
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 sm:w-[70%] w-[90%]"
        >
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <label
              className="sm:text-3xl text-2xl font-medium"
              htmlFor="username"
            >
              Username :
            </label>
            <input
              type="text"
              id="username"
              className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full"
              // value={userData.username}
              defaultValue={userData.username}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <label className="sm:text-3xl text-2xl font-medium" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full"
              // value={userData.email}
              defaultValue={userData.email}
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <label className="sm:text-3xl text-2xl font-medium" htmlFor="phone">
              Mobile No. :
            </label>
            <div className="flex xl:flex-row flex-col gap-4 xl:w-3/5 w-full">
              <input
                type="text"
                id="phone"
                className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium xl:w-3/5"
              />
              <button className="w-2/5 rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2  xl:text-2xl text-xl font-semibold text-white">
                verify
              </button>
            </div>
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <label
              className="sm:text-3xl text-2xl font-medium"
              htmlFor="birthdate"
            >
              Birth Date :
            </label>
            <input
              type="date"
              id="birthdate"
              className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full"
              placeholder="Enter your birth date"
            />
          </div>
          <div className="flex xl:flex-row flex-col justify-between xl:items-center items-start gap-4 w-full mb-6">
            <label
              className="sm:text-3xl text-2xl font-medium"
              htmlFor="gender"
            >
              Gender :
            </label>
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
            <label
              className="sm:text-3xl text-2xl font-medium"
              htmlFor="address"
            >
              Address :
            </label>
            <textarea
              name="address"
              id="address"
              className="rounded-xl xl:text-xl text-base p-2 font-medium xl:w-3/5 w-full h-32"
            />
          </div>
          <div className="flex justify-end items-center w-full gap-5">
            <button className=" rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 px-4 xl:text-2xl text-xl font-semibold text-white">
              clear
            </button>
            <button className=" rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 px-4 xl:text-2xl text-xl font-semibold text-white">
              save
            </button>
          </div>
        </form>
        <div className="flex  justify-around items-center w-full">
          <h3 className="sm:text-2xl text-xl font-medium ">
            To update password?
          </h3>
          <button className="rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 xl:px-4 xl:text-2xl text-xl font-semibold text-white">
            Click here
          </button>
        </div>
      </div>
    </Container>
  );
}
