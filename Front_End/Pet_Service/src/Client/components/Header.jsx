import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const menuItems = (
    <Menu
      items={[
        { label: <a href="#home">Trang chủ</a>, key: "1" },
        { label: <a href="#products">Sản phẩm</a>, key: "2" },
        { label: <a href="#services">Dịch vụ</a>, key: "3" },
        { label: <a href="#about">Giới thiệu</a>, key: "4" },
        { label: <a href="#contact">Liên hệ</a>, key: "5" },
      ]}
    />
  );

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="header flex justify-center align-items-center">
      <div className="menu">
        <Dropdown
          overlay={menuItems}
          trigger={["click"]}
          overlayClassName="custom-dropdown-menu"
        >
          <div className="flex flex-col justify-center align-items-center cursor-pointer">
            <FontAwesomeIcon icon={faBars} className="icon text-lg" />
            <div>Menu</div>
          </div>
        </Dropdown>
      </div>
      <div className="logo ml-3 cursor-pointer">
        <img
          src="https://theme.hstatic.net/200000263355/1001161916/14/logo.png?v=134"
          alt="logo"
          className="w-[55px] h-[55px]"
        />
      </div>
      <div className="search">
        <input type="text" placeholder="Tìm kiếm sản phẩm" />
      </div>
      <div className="header-action flex">
        {user?.data ? (
          <div>{user?.data?.user_name}</div>
        ) : (
          <div
            className="account flex flex-col justify-center align-items-center"
            onClick={() => handleLogin()}
          >
            <FontAwesomeIcon icon={faUser} className="icon" />
            <div>Tài Khoản</div>
          </div>
        )}
        <div className="carts flex flex-col justify-center align-items-center">
          <FontAwesomeIcon icon={faCartShopping} className="icon" />
          <div>Giỏ Hàng</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
