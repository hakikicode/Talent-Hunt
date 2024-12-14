import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center font-poppins px-8 py-[10px] my-3  transition-colors duration-300 transform  hover:bg-gray-100   hover:text-gray-600 ${
          isActive ? "bg-gray-100  text-gray-600" : "text-gray-500"
        }`
      }
    >
      <Icon className={`w-5 h-5 text-gray-500 `} size={26} />

      <span className={"mx-4 font-medium"}>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
