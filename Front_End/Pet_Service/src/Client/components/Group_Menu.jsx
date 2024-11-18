import "./Group_Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const Group_Menu = () => {
  return (
    <>
      <div className="group_menu">
        <div className="icon">
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div className="group-carts">
          <div className="cart-item">
            <p>Mua đồ cho chó</p>
          </div>
          <div className="cart-item">
            <p>Mua đồ cho mèo</p>
          </div>
          <div className="cart-item">
            <p>Pettag Mozzi</p>
          </div>
          <div className="cart-item">
            <p>Dịch vụ spa</p>
          </div>
          <div className="cart-item">
            <p>Khuyến mãi</p>
          </div>
          <div className="cart-item">
            <p>Tin tức</p>
          </div>
          <div className="cart-item">
            <p>Liên hệ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group_Menu;
