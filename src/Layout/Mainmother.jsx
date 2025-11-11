import Navbar from "../Components/Navber";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const Mainmother = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f6fa]">
      <Navbar />
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mainmother;
