import { useState } from "react";
import "./Shopping_Cart.scss";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";

const Shopping_Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(12000);
  return (
    <div className="contents-carts-container container">
      <div className="title-carts">Giỏ hàng</div>
      <div className="content-carts">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="details-product">
                <div className="title-carts-product">
                  <Form.Check
                    inline
                    label="Tất cả"
                    className="check-box"
                    value="check"
                  />
                  <div className="title-price">Đơn giá</div>
                  <div className="title-quantity">Số lượng</div>
                  <div className="title-total-price">Thành tiền</div>
                  <div className="delete">
                    <MdDelete />
                  </div>
                </div>
                <div className="product-carts">
                  <div className="title">Sản phẩm</div>

                  <Row className="info-product">
                    <Col md={1}>
                      <Form.Check inline value="check" />
                    </Col>

                    <Col md={4}>
                      <div className="title-product">
                        <img
                          src="https://product.hstatic.net/200000263355/product/z5625317232002_a6d5cca3bb39d486d8870c927d894c21_839973b078544de8bc1a13c2a6aef528_medium.jpg"
                          alt="product"
                        />
                        <div className="ml-5">đồ dùng cho meo</div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="price-product ml-10">10000 đ</div>
                    </Col>
                    <Col md={2}>
                      <div className="count-product">
                        <span
                          className="minus"
                          onClick={() => setQuantity(quantity - 1)}
                        >
                          <MinusOutlined />
                        </span>
                        <input
                          value={quantity}
                          style={{
                            width: "40px",
                            height: "34px",
                            border: "1px solid #ccc",
                            paddingLeft: "15px",
                          }}
                        />
                        <span
                          className="plus"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <PlusOutlined />
                        </span>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="total-price-product">
                        {quantity * price} đ
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-lg font-semibold">Ghi chú đơn hàng</div>
                <div className="mt-3">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Nhập ghi chú tại đây..."
                  ></textarea>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="total-payment">
                <div className="total-price">
                  <div className="provisional">
                    <div className="title">Tạm tính</div>
                    <div className="price">100000 đ</div>
                  </div>
                  <div className="sum-price">
                    <div className="title">Tổng tiền</div>
                    <div className="price">100000 đ</div>
                  </div>
                </div>
                <button className="btn">Thanh Toán</button>
              </div>
              <div className="mt-5">
                <div className="text-sm text-[#252a2b] before:content-['•'] before:mr-2">
                  Miễn phí vận chuyển cho đơn hàng từ 399.000đ (Dưới 10km từ
                  Mozzi Phú Nhuận)
                </div>
                <div className="text-sm mt-3 text-[#252a2b] before:content-['•'] before:mr-2">
                  Giao hàng hỏa tốc trong vòng 4 giờ, áp dụng tại khu vực nội
                  thành Hồ Chí Minh
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Shopping_Cart;
