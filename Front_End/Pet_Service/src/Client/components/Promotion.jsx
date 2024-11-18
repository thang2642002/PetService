import "./Promotion.scss";
const Promotion = () => {
  return (
    <>
      <div className="promotion flex justify-between align-items-center">
        <div className="item flex flex-col">
          <span className="title">Ship cod toàn quốc</span>
          <span className="desc">Thanh toán khi nhận hàng</span>
        </div>
        <div className="item flex flex-col">
          <span className="title">Miễn phí đổi hàng</span>
          <span className="desc">Trong vòng 7 ngày</span>
        </div>
        <div className="item flex flex-col">
          <span className="title">Giao hàng trong ngày</span>
          <span className="desc">Đối với đơn hàng thành phố HCM</span>
        </div>
        <div className="item flex flex-col">
          <span className="title">Đặt hàng trực tuyến</span>
          <span className="desc">Hotline: 0342925377</span>
        </div>
      </div>
    </>
  );
};

export default Promotion;
