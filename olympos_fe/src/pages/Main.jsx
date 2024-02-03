import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Outlet } from "react-router-dom";

const Main = ({}) => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
