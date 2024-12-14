import MenuItem from "./MenuItem";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineTrophy,
  HiOutlineUser,
} from "react-icons/hi2";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        label="Home"
        icon={HiOutlineHome}
        address="/dashboard/admin-stats"
      />
      <MenuItem
        label="Users"
        icon={HiOutlineUsers}
        address="/dashboard/users"
      />
      <MenuItem
        label="Contests"
        icon={HiOutlineTrophy}
        address="/dashboard/contests"
      />
      <MenuItem
        label="My Profile"
        icon={HiOutlineUser}
        address="/dashboard/profile"
      />
    </>
  );
};

export default AdminMenu;
