import useRole from "../../hooks/useRole";
import Logo from "../Shared/Logo";
import UsersMenu from "./UserMenu";
import CreatorMenu from "./CreatorMenu";
import AdminMenu from "./AdminMenu";

const Sidebar = ({ isActive }) => {
  const { role } = useRole();

  return (
    <div
      className={`z-10 bg-white border-r fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 inset-y-0 left-0 transform ${
        isActive && "-translate-x-full"
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div>
        <div>
          <div className="w-full flex px-4 mt-4 rounded-lg justify-center items-center mx-auto">
            <Logo />
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {/* Menu Items */}
            {role === "user" && <UsersMenu />}
            {role === "creator" && <CreatorMenu />}
            {role === "admin" && <AdminMenu />}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
