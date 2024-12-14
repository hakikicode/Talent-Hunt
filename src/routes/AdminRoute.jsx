import { Navigate } from "react-router-dom";

import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loader />;

  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
