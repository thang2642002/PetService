import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Payment.scss";
const Payment = () => {
  return (
    <>
      <div className="payment-container">
        <Container>
          <div className="content-payment">
            <div className="delivery-address">
              <div className="title">Địa chỉ giao hàng</div>
              <div className="info-user">
                <span className="name">Trần thắng</span>
                <span className="address">TP HCM</span>
                <span className="phone">0342924277</span>
              </div>
            </div>

            <div className="payment-transaction">
              <div className="title">Phương thức Thanh toán</div>
              <div className="transaction">
                <div className="check">
                  <Form.Check
                    inline
                    label="Thanh toán bằng Ví Paypall"
                    name="paypall"
                    type="radio"
                    value="paypall"
                    id="1"
                    className="check-radio"
                  />
                </div>
                <div>
                  <Form.Check
                    inline
                    label="Thanh toán khi nhận hàng"
                    name="paypall"
                    value="payment"
                    type="radio"
                    id="2"
                    className="check-radio"
                  />
                </div>
              </div>
            </div>
            <div className="check-product">
              <div className="title">KIỂM TRA LẠI ĐƠN HÀNG</div>

              <Row>
                <div className="product">
                  <Col md={2} lg={2}>
                    <div className="img-product">
                      <img
                        src="https://product.hstatic.net/200000263355/product/z5625317232002_a6d5cca3bb39d486d8870c927d894c21_839973b078544de8bc1a13c2a6aef528_master.jpg"
                        alt="product"
                      />
                    </div>
                  </Col>
                  <Col md={4} lg={4}>
                    <div className="title-product">THú cưng</div>
                  </Col>

                  <Col md={3} lg={2}>
                    <div className="sales-product">0đ</div>
                  </Col>
                  <Col md={3} lg={2}>
                    <div className="price-product">10000 đ</div>
                  </Col>
                </div>
              </Row>
            </div>
            <div className="total">
              <div className="total_price">
                Tổng tiền: <span>1000000</span>
              </div>
            </div>
            <div className="btn-confirm">
              <button
                type="button"
                className="btn btn-primary"
                // onClick={handPaymentSuccess}
              >
                Xác nhận đặt hàng
              </button>
              {/* {showPayPall ? (
                <PayPalButton
                  amount={(data.totalPrice / 32000).toFixed(2)}
                  onSuccess={onSuccessPaypal}
                  onError={(e) => {
                    console.log(e);
                  }}
                />
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handPaymentSuccess}
                >
                  Xác nhận đặt hàng
                </button>
              )} */}
            </div>
          </div>
        </Container>
        {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
      </div>
    </>
  );
};

export default Payment;
