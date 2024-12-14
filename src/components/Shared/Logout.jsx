import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

const Logout = () => {
  const { logOut, loading, setLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error?.message || "Failed to logout");
    }
  };

  return (
    <Button type="icon" disabled={loading} onClick={handleLogout}>
      {!loading ? (
        <HiArrowRightOnRectangle className="text-xl" size={21} />
      ) : (
        <SpinnerMini />
      )}
    </Button>
  );
};

export default Logout;
