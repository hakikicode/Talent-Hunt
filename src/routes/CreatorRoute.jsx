import { Navigate } from "react-router-dom";

import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";

const CreatorRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loader />;

  if (role !== "creator") return <Navigate to="/" />;

  return children;
};

export default CreatorRoute;
