import { Container, CustomButton, InputField, TextLabel } from "../index";
import authService from "../../services/auth.service";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSumbit = async (event) => {
    try {
      event.preventDefault();
      const response = await authService.forgotPassword({ email });
      if (response) {
        alert("check mail");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container
      className={
        "w-full h-[55rem] m-auto flex flex-col justify-center items-center bg-[#FDFFE2]"
      }
    >
      <h3 className="md:text-4xl text-3xl  font-bold text-black mb-4">
        Forgot Password
      </h3>
      <form
        className=" bg-[#83B4FF] p-4 rounded-3xl space-y-5"
        onSubmit={handleSumbit}
      >
        <TextLabel text={"Enter your Email :"} htmlFor={"email"} />
        <InputField
          type={"email"}
          id={"email"}
          name={"email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="flex w-full justify-end">
          <CustomButton
            type={"sumbit"}
            className={"p-4 xl:text-xl text-lg"}
            text={"Sumbit"}
          />
        </div>{" "}
      </form>
    </Container>
  );
}
