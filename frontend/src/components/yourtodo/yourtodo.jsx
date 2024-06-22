import React from "react";
import { Container, CustomButton, InputField } from "../index.jsx";
export default function YourTodo() {
  return (
    <Container
      className={
        "flex justify-start items-start w-full sm:h-screen h-full bg-[#FDFFE2] pt-28 pb-10"
      }
    >
      <div className="grid md:grid-cols-2 grid-cols-1 p-2">
        <div className="bg-[#83B4FF] p-4 rounded-3xl h-full w-full">
          <h3 className="text-4xl font-bold mt-2">{"Title"}</h3>
          <hr className="border-2 border-black my-4" />
          <div className="flex xl:flex-row flex-col justify-center xl:items-center items-end gap-2 bg-[#83B4FF] ">
            <span className="flex justify-center items-start gap-1 xl:w-1/2 w-full my-2">
              <input type="checkbox" name="" id="" className="w-4 h-4 p" />
              <textarea
                className="rounded-xl h-24 xl:text-xl text-base p-2 font-medium w-full"
                name="todo"
                placeholder="Todo"
              />
            </span>
            <span className="flex xl:justify-between items-center gap-4 xl:w-1/2 w-full my-2">
              <InputField className="w-full" type="time" name="start" />
              <InputField className="w-full" type="time" name="end" />
            </span>
            <span className="xl:block flex gap-4 ">
              <CustomButton
                className="w-full p-2 xl:px-2 px-4 xl:text-2xl text-xl xl:mb-4"
                text={"U"}
              />
              <CustomButton
                className="w-full p-2 xl:px-2 px-4 xl:text-2xl text-xl xl:mb-4"
                text={"D"}
              />
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
