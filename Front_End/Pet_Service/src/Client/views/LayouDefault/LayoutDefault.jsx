import Header from "../components/Header";
import Footer from "../components/footer";
import PropTypes from "prop-types";

const LayoutDefault = ({ children }) => {
  return (
    <>
      <div className="container">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

LayoutDefault.propTypes = {
  children: PropTypes.node,
};

export default LayoutDefault;
