import { useState } from "react";
import { Container, CreateTodo, CustomButton, InputField } from "../index.jsx";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

export default function YourTodo() {
  const [createTodo, setcreateTodo] = useState(false);
  const [addSubTask, setAddSubTask] = useState([1]);
  const [addTask, setAddTask] = useState([1]);
  return (
    <Container
      className={`flex flex-col gap-4 justify-start items-start w-full ${
        addSubTask.length > 4 ? "md:h-full" : "md:h-screen"
      } h-full bg-[#FDFFE2] ${
        createTodo ? "pt-[4.5rem]" : "pt-20"
      } pb-10 relative`}
    >
      <div className="flex justify-end w-full pr-5">
        <CustomButton
          text={"Add Todo"}
          className={"p-3 xl:text-2xl text-xl"}
          onClick={() => {
            setcreateTodo(!createTodo);
          }}
        />
      </div>
      {createTodo && (
        <div className="absolute w-full md:h-[55rem] h-screen">
          <CreateTodo createTodo={createTodo} setcreateTodo={setcreateTodo} />
        </div>
      )}

      {false && (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mx-auto sm:w-auto w-[90%]">
          {addTask.map(() => (
            <div className="bg-[#83B4FF] p-4 rounded-3xl">
              <div className="flex">
                <InputField
                  className="sm:text-4xl text-3xl font-bold mt-2 bg-transparent text-black placeholder:text-black rounded-none"
                  placeholder={"Enter Your Title"}
                  defaultValue={"Title"}
                />
                <CustomButton
                  className={"p-3"}
                  text={<IoIosAddCircle size={22} />}
                  onClick={() => setAddSubTask((prev) => [...prev, 1])}
                />
              </div>
              <hr className="border-2 border-black my-2" />
              {addSubTask.map(() => (
                <div className="flex md:flex-row flex-col justify-center gap-2 py-2">
                  <div className="flex-1">
                    <span>
                      <textarea
                        className="rounded-xl h-24 xl:text-xl text-base p-2 font-medium w-full"
                        name="todo"
                        placeholder="Todo"
                      />
                    </span>
                    <span className="flex justify-between items-center gap-4 w-full ">
                      <InputField className="w-full" type="time" name="start" />
                      <InputField className="w-full" type="time" name="end" />
                    </span>
                  </div>
                  <span className="flex  md:flex-col justify-end gap-2">
                    <CustomButton
                      className="p-3"
                      text={<IoCheckmarkDoneCircleSharp size={22} />}
                    />
                    <CustomButton
                      className="p-3"
                      text={<MdDelete size={22} />}
                    />
                    <CustomButton
                      className="p-3"
                      text={<GrUpdate size={20} />}
                    />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
