import { useNavigate, useRouteError } from "react-router-dom";
import Button from "../components/Shared/Button";
import Title from "../components/Shared/Title";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <Title title="Error Page | Talent Hunt" />
      <img
        src="https://i.ibb.co/x6D2KS8/404.jpg"
        alt="Error Image"
        className="w-auto md:max-w-[300px] mx-auto"
      />
      <div className="text-center container mx-auto px-4 md:px-0">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-lg  text-gray-600  mb-8">
          {error?.error?.message ||
            "We apologize for the inconvenience. Please try again later."}
        </p>
        <Button onClick={() => navigate("/")} label="Back to home" />
      </div>
    </div>
  );
};

export default ErrorPage;
