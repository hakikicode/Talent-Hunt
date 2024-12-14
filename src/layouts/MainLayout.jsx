import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/Shared/ScrollToTop";

const Main = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main className="pt-[72px] lg:pt-[88px] min-h-[calc(100vh-312px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
