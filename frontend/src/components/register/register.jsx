import { Container } from "../index.jsx";
import IMG from "../../assets/images/login.webp";
import { Link } from "react-router-dom";

export default function Register() {
  const handleSumbit = () => {};
  return (
    <Container
      className={
        "flex justify-center items-center h-screen w-full bg-[#FDFFE2]"
      }
    >
      <div className="sm:flex hidden w-1/2 justify-center">
        <img src={IMG} alt="-" />
      </div>
      <div className="sm:w-1/2 w-full h-full bg-[#83B4FF] flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-50">SignUp</h1>
        <h3 className="text-2xl font-bold text-slate-50 mb-6">
          Create Your Account
        </h3>
        <form
          method="post"
          className="flex flex-col justify-center items-start border-2 border-[#5A72A0] rounded-3xl sm:p-8 p-4 xl:w-[65%] w-[90%]"
          onSubmit={handleSumbit}
        >
          <label
            htmlFor="username"
            className="sm:text-3xl text-2xl font-medium"
          >
            Username:
          </label>
          <input
            className="rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium mt-3"
            name="username"
            type="text"
            id="username"
          />
          <label
            htmlFor="email"
            className="sm:text-3xl text-2xl font-medium mt-6"
          >
            Email:
          </label>
          <input
            className="rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium mt-3"
            name="email"
            type="email"
            id="email"
          />
          <label
            htmlFor="password"
            className="sm:text-3xl text-2xl font-medium mt-6"
          >
            Password:
          </label>
          <input
            className="rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium mt-3"
            name="password"
            type="password"
            id="password"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] p-2 sm:text-2xl text-xl font-semibold text-white mt-10"
          >
            Sign Up
          </button>
          <p className="lg:text-xl md:text-base text-sm font-medium mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
