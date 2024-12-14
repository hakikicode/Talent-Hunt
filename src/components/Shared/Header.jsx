import { HiOutlineUser } from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";
import Button from "./Button";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

const Header = ({ handleToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[60px] fixed top-0 right-0 px-12 border-b flex justify-end bg-gray-100 z-10">
      <ul className="flex items-center gap-x-4">
        <li className="flex  items-center gap-x-2">
          <img
            src={user?.photoURL}
            alt={`Photo of ${user?.displayName}`}
            className="object-cover h-8 w-8 rounded-full"
          />
          <span className="font-medium">{user?.displayName.split(" ")[0]}</span>
        </li>
        <li>
          <Button type="icon" onClick={() => navigate("/dashboard/profile")}>
            <HiOutlineUser size={21} />
          </Button>
        </li>
        <li>
          <Logout />
        </li>
        <li className="md:hidden">
          <Button onClick={handleToggle} type="icon">
            <AiOutlineBars size={21} />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
