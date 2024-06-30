import { Container, CustomButton, InputField, TextLabel } from "../index";
import authService from "../../services/auth.service";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyUser() {
  const [hashToken] = useSearchParams();
  const navigate = useNavigate();
  const token = hashToken.get("token");
  useEffect(() => {
    (async () => {
      try {
        const response = await authService.verifyUser({ token });
        console.log(response);
        if (response) {
          alert("User Verified");
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [token]);
  return (
    <Container
      className={
        "w-full h-[55rem] m-auto flex flex-col justify-center items-center bg-[#FDFFE2]"
      }
    >
      <h3 className="md:text-4xl text-3xl  font-bold text-black mb-4">
        User Verified
      </h3>
    </Container>
  );
}
