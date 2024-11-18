import "./OrderDetails.scss";
const OrderDetails = () => {
  return (
    <>
      <div className="container">
        <div className="order-container">
          <div className="hearder-order">
            <div className="title">Tất cả</div>
          </div>
          <div className="conten-order-container">
            <div className="title-order">
              <div className="name-details-order">Chi Tiết Đơn Hàng</div>
              <div className="transaction">
                <span className="order-success">Đặt Hàng Thành Công</span>
                <span className="warning-order">Chờ Giao Hàng</span>
              </div>
            </div>
            <div className="title-product">
              <div className="title-img">Hình Ảnh</div>
              <div className="product-title">Tiêu Đề</div>
              <div className="quantity-title">Số Lượng</div>
              <div className="price-title">Giá Bán</div>
            </div>
            <div className="details-product">
              <div className="img-product">
                <img
                  src="https://product.hstatic.net/200000263355/product/z5625317232002_a6d5cca3bb39d486d8870c927d894c21_839973b078544de8bc1a13c2a6aef528_master.jpg"
                  alt="ảnh"
                />
              </div>
              <div className="title-product">THú cưng</div>
              <div className="title-quantity">1</div>
              <div className="price-product">10000đ</div>
            </div>
            <div className="sum-product">
              <div className="total-price">Tổng tiền đơn hàng: 100000đ</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
