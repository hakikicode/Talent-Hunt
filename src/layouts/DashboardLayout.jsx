import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Shared/Header";
import { useState } from "react";
import Title from "../components/Shared/Title";

const DashboardLayout = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative min-h-screen">
      <Title title="Dashboard | Talent Hunt" />
      <Header handleToggle={handleToggle} />
      <Sidebar isActive={isActive} />
      <div className="flex-1 min-h-screen overflow-auto pt-[80px] md:ml-[256px] bg-gray-50 py-8 px-4 md:px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
