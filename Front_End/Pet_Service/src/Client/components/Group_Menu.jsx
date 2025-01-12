import "./Group_Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
const Group_Menu = () => {
  const navigate = useNavigate();
  const handleNavigation = (type) => {
    navigate(`/category-product/${type}`);
  };

  const handleHome = () => {
    navigate("/");
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="group_menu">
        <div className="icon">
          <FontAwesomeIcon icon={faHouse} onClick={handleHome} />
        </div>
        <Slider {...sliderSettings} className="group-carts mobile">
          <div className="cart-item" onClick={() => handleNavigation("pets")}>
            <p>Mua thú cưng</p>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("products")}
          >
            <p>Đồ cho thú cưng</p>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("pettags")}
          >
            <p>Pettag Mozzi</p>
          </div>
          <div className="cart-item">
            <Link
              to="/info-pet"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Dịch vụ pet
            </Link>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("discount")}
          >
            <p>Khuyến mãi</p>
          </div>
          <div className="cart-item">
            <Link
              to="/post"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Tin tức
            </Link>
          </div>
          <div className="cart-item">
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Liên hệ
            </Link>
          </div>
        </Slider>

        <div className="group-carts gr-main">
          <div className="cart-item" onClick={() => handleNavigation("pets")}>
            <p>Mua thú cưng</p>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("products")}
          >
            <p>Đồ cho thú cưng</p>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("pettags")}
          >
            <p>Pettag Mozzi</p>
          </div>
          <div className="cart-item">
            <Link
              to="/info-pet"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Dịch vụ pet
            </Link>
          </div>
          <div
            className="cart-item"
            onClick={() => handleNavigation("discount")}
          >
            <p>Khuyến mãi</p>
          </div>
          <div className="cart-item">
            <Link
              to="/post"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Tin tức
            </Link>
          </div>
          <div className="cart-item">
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "#252a2b" }}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group_Menu;
