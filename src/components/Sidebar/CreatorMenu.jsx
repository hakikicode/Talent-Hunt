import { IoMdAddCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiBrainFill } from "react-icons/ri";

import MenuItem from "./MenuItem";

const CreatorMenu = () => {
  return (
    <>
      <MenuItem
        label="Add Contest"
        icon={IoMdAddCircle}
        address="/dashboard/contests/new"
      />
      <MenuItem
        label="My Created Contests"
        icon={RiBrainFill}
        address="/dashboard/creator/contests"
      />
      <MenuItem label="My Profile" icon={FaUser} address="/dashboard/profile" />
    </>
  );
};

export default CreatorMenu;
