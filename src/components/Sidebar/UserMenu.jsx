import MenuItem from "./MenuItem";
import { FaCashRegister, FaGrinWink, FaUser } from "react-icons/fa";

const UsersMenu = () => {
  return (
    <>
      <MenuItem
        label="My Registered Contests"
        icon={FaCashRegister}
        address="/dashboard/registered-contests"
      />
      <MenuItem
        label="My Winning Contests"
        icon={FaGrinWink}
        address="/dashboard/winning-contests"
      />
      <MenuItem label="My Profile" icon={FaUser} address="/dashboard/profile" />
    </>
  );
};

export default UsersMenu;
