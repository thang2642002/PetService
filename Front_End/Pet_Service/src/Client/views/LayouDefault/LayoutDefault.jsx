import Header from "../../components/Header";
import Footer from "../../components/footer";
import Small_Slice from "../../components/Small_Slice";
import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
  return (
    <>
      <div className="container">
        <Small_Slice />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default LayoutDefault;
