import MenuDropdown from "./MenuDropdown";
import Logo from "../Shared/Logo";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import open from "./open.svg";
import close from "./close.svg";
import useAuth from "../../hooks/useAuth";
import { BsCoin } from "react-icons/bs";
import useUser from "../../hooks/useUser";
import { IoAdd } from "react-icons/io5";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const { userData, isLoading } = useUser();

  const credits = userData?.credits || 0;

  const links = (
    <>
      <NavLink
        to="/"
        title=""
        className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 "
      >
        Home
      </NavLink>

      <NavLink
        to="/contests"
        title=""
        className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
      >
        Contestants
      </NavLink>

      <NavLink
        to="/leaderboard"
        title=""
        className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
      >
        Leader Board
      </NavLink>
    </>
  );

  return (
    <header className="fixed w-full bg-gray-50 border-b z-10  py-4 md:py-6">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-x-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="sm" />
          </div>

          <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
            {/* Links */}
            {user && links}
          </div>

          <div className="lg:mr-0 ml-auto flex items-center space-x-4 lg:space-x-10">
            {user ? (
              <>
                {userData?.role === "creator" && (
                  <div className="flex items-center gap-x-1">
                    <BsCoin
                      size={24}
                      className="inline-block text-2xl text-gray-900"
                    />
                    <span className="inline-block text-xl text-gray-600 font-sono font-semibold">
                      {credits}
                    </span>

                    <div className="hidden lg:flex ml-2">
                      <Link
                        to="/credits/buy"
                        className="inline-flex items-center justify-center px-2 py-[2px] text-sm font-medium leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        role="button"
                      >
                        Buy Credits
                      </Link>
                    </div>
                    <div className="flex lg:hidden ml-2">
                      <Link
                        to="/credits/buy"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium leading-7 transition-all duration-200 text-gray-900 border-gray-900 border border-transparent  hover:bg-gray-100 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100"
                        role="button"
                      >
                        <IoAdd size={24} />
                      </Link>
                    </div>
                  </div>
                )}
                <MenuDropdown role={userData?.role} isLoading={isLoading} />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  title=""
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  title=""
                  className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {user && (
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                <span
                  style={{ display: !expanded ? "block" : "none" }}
                  aria-hidden="true"
                >
                  {/* SVG for closed */}
                  <img src={close} alt="" className="h-7 w-7" />
                </span>
                <span
                  style={{ display: expanded ? "block" : "none" }}
                  aria-hidden="true"
                >
                  {/* SVG for expanded */}
                  <img src={open} alt="" className="h-7 w-7" />
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Collapsed navigation */}
        {expanded && (
          <nav>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">{user && links}</div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
