import { Container, CustomButton, InputField } from "../index.jsx";
import { ImCross } from "react-icons/im";

export default function CreateTodo({ createTodo, setcreateTodo }) {
  return (
    <Container
      className={
        "flex justify-center items-center w-full h-full backdrop-blur-2xl backdrop-contrast-75"
      }
    >
      <div className=" bg-[#83B4FF] p-4 rounded-3xl flex flex-col lg:w-1/3 w-auto">
        <div className=" flex justify-between mx-1">
          <h2 className="xl:text-4xl text-3xl font-bold my-2">
            Create Your Todo
          </h2>
          <button onClick={() => setcreateTodo(!createTodo)}>
            <ImCross className="" size={20} />
          </button>
        </div>
        <hr />
        <div className="flex flex-col justify-center xl:items-center items-end gap-2">
          <InputField
            className="sm:text-3xl text-2xl font-bold mt-2 bg-transparent text-black border-b-2 border-black placeholder:text-black rounded-none"
            placeholder={"Enter Your Title"}
          />
          <span className="flex justify-center items-start gap-1 w-full my-2">
            <textarea
              className="rounded-xl h-24 xl:text-xl text-base p-2 font-medium w-full"
              name="todo"
              placeholder="Todo"
            />
          </span>
          <span className="flex xl:justify-between items-center gap-4 w-full my-2">
            <InputField className="w-full" type="time" name="start" />
            <InputField className="w-full" type="time" name="end" />
          </span>
          <span className="flex justify-end w-full gap-4">
            <CustomButton
              className="w-full p-2 xl:px-2 px-4 xl:text-2xl text-xl xl:mb-4"
              text={"Clear"}
            />
            <CustomButton
              className="w-full p-2 xl:px-2 px-4 xl:text-2xl text-xl xl:mb-4"
              text={"Save"}
            />
          </span>
        </div>
      </div>
    </Container>
  );
}
