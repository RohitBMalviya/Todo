import React from "react";
import { Container } from "../index.jsx";
export default function YourTodo() {
  return (
    <Container
      className={
        "flex justify-start items-start w-full xl:h-screen h-full bg-[#FDFFE2] pt-28 pb-10"
      }
    >
      <div className="grid md:grid-cols-2 grid-cols-1 p-2">
        <div className="bg-[#83B4FF] p-4 rounded-3xl h-full w-full">
          <h3 className="text-4xl font-bold mt-2">{"Title"}</h3>
          <hr className="border-2 border-black my-4" />
          <div className="flex xl:flex-row flex-col justify-center xl:items-center items-end gap-2">
            <span className="flex justify-center items-center gap-1 xl:w-1/2 w-full my-2">
              <input type="checkbox" name="" id="" className="w-4 h-4" />
              <textarea
                className="rounded-xl h-24 xl:text-xl text-base p-2 font-medium w-full"
                name="todo"
                placeholder="Todo"
              />
            </span>
            <span className="flex xl:justify-between items-center gap-4 xl:w-1/2 w-full my-2">
              <input
                className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium  w-full"
                type="time"
                name="start"
              />
              <input
                className="rounded-xl h-12 xl:text-xl text-base p-2 font-medium w-full "
                type="time"
                name="end"
              />
            </span>
            <span className="xl:block flex gap-4 ">
              <button className="w-full rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] xl:p-2 p-2 xl:px-0 px-4  xl:text-2xl text-xl font-semibold text-white xl:mb-4">
                U
              </button>
              <button className="w-full rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] xl:p-2 p-2 px-4  xl:text-2xl text-xl font-semibold text-white">
                D
              </button>
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
