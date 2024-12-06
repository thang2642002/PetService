import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/userSlices";
import { logoutUser } from "../../services/userServices";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [inputSearch, setInputSearch] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const menuItems = (
    <Menu
      items={[
        { label: <a href="/">Trang chủ</a>, key: "1" },
        {
          label: <div onClick={() => handleProduct("products")}>Sản phẩm</div>,
          key: "2",
        },
        {
          label: <div onClick={() => handlePet("pets")}>Thú cưng</div>,
          key: "3",
        },
        { label: <a href="/info-pet">Dịch vụ</a>, key: "4" },
        { label: <div href="#about">Giới thiệu</div>, key: "5" },
        { label: <a href="/contact">Liên hệ</a>, key: "6" },
      ]}
    />
  );

  const handleLogOut = async () => {
    await logoutUser();
    localStorage.removeItem("access_tokens");
    dispatch(logout());
  };

  const handleSearch = (e, type) => {
    if (e.key === "Enter") {
      console.log("Check inputSearch before navigate:", inputSearch);
      navigate(`/category-product/${type}`, { state: { inputSearch } });
      setInputSearch("");
    }
  };

  const handleProduct = (type) => {
    navigate(`/category-product/${type}`);
  };

  const handlePet = (type) => {
    navigate(`/category-product/${type}`);
  };

  const userMenuItems = [
    { label: <a href="/profile-user">Thông tin tài khoản</a>, key: "1" },
    { label: <a href="/orders">Xem đơn hàng</a>, key: "2" },
  ];

  // Kiểm tra role để thêm menu "Quản lý trang"
  if (user?.data?.role === "manager") {
    userMenuItems.push({
      label: <a href="/admin">Quản lý trang</a>,
      key: "3",
    });
  }

  userMenuItems.push({
    label: <div onClick={handleLogOut}>Đăng xuất</div>,
    key: "4",
  });

  const userMenu = <Menu items={userMenuItems} />;

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="header flex justify-between items-center p-4  bg-white">
      <div className="menu">
        <Dropdown
          overlay={menuItems}
          trigger={["click"]}
          overlayClassName="custom-dropdown-menu"
        >
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faBars} className="icon text-lg" />
            <div>Menu</div>
          </div>
        </Dropdown>
      </div>
      <div className="logo cursor-pointer">
        <a href="/">
          <img
            src="https://theme.hstatic.net/200000263355/1001161916/14/logo.png?v=134"
            alt="logo"
            className="w-[55px] h-[55px]"
          />
        </a>
      </div>
      <div className="search flex-grow mx-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => handleSearch(e, "search")}
        />
      </div>
      <div className="header-action flex items-center gap-4">
        {user?.data ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div className="user-info flex items-center gap-2 cursor-pointer">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-700 text-lg"
              />
              <span className="font-semibold text-gray-700">
                {user?.data?.user_name}
              </span>
            </div>
          </Dropdown>
        ) : (
          <div
            className="account flex flex-col justify-center items-center cursor-pointer"
            onClick={handleLogin}
          >
            <FontAwesomeIcon icon={faUser} className="icon text-gray-700" />
            <div>Tài Khoản</div>
          </div>
        )}
        <Link
          to={`shop-carts/${user?.data?.user_id}`}
          style={{ textDecoration: "none", color: "#252a2b" }}
        >
          <div className="carts flex flex-col justify-center items-center cursor-pointer">
            <div className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="icon text-gray-700"
              />
              <span className="absolute top-[-15px] right-[-25px] px-[7px] py-[1px] bg-red-500 text-[14px] rounded-full text-white">
                {cart.totalItems}
              </span>
            </div>
            <div>Giỏ Hàng</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
