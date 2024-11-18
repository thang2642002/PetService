import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <>
      <div className="header flex justify-center align-items-center">
        <div className="menu">
          <div className="flex flex-col justify-center align-items-center">
            <FontAwesomeIcon icon={faBars} className="icon" />
            <div>Menu</div>
          </div>
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
        <div className="header-action flex ">
          <div className="account flex flex-col justify-center align-items-center">
            <FontAwesomeIcon icon={faUser} className="icon" />

            <div>Tài Khoản</div>
          </div>
          <div className="carts flex flex-col justify-center align-items-center">
            <FontAwesomeIcon icon={faCartShopping} className="icon" />
            <div>Giỏ Hàng</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
