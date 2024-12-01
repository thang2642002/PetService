import { useEffect, useState } from "react";
import "./Shopping_Cart.scss";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import { getByCartId } from "../../../services/cartService";
import { updateCartItem } from "../../../services/cartItemServices";
import { useParams } from "react-router-dom";

const Shopping_Cart = () => {
  const [price, setPrice] = useState(12000);
  const [totalAmount, setTotalAmount] = useState(0);
  const [listCartItem, setListCartItem] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [check, setCheck] = useState([]);
  const { id } = useParams();
  let sumTotal = 0;

  const fetchListCartItem = async () => {
    const data = await getByCartId(id);
    if (data && data.errCode === 0) {
      setTotalAmount(data.data.total_amount);
      console.log("total_amount", data);
      setListCartItem(data.data.cartItems);
      console.log(data.data.cartItems);
    }
  };

  const handleUpdateQuantity = async (
    id,
    changeQuantity,
    total_price,
    type
  ) => {
    if (type === "minus") {
      const data = await updateCartItem(
        id,
        changeQuantity - 1,
        total_price * (changeQuantity - 1)
      );
      fetchListCartItem();
    } else {
      const data = await updateCartItem(
        id,
        changeQuantity + 1,
        total_price * (changeQuantity + 1)
      );
      fetchListCartItem();
    }
  };

  const TotalSum = (price, check) => {
    if (check === true) {
      sumTotal += price;
    } else {
      sumTotal -= price;
    }
  };

  useEffect(() => {
    fetchListCartItem();
  }, []);

  useEffect(() => {
    if (listCartItem) {
      const quantities = listCartItem.map((item) => item.quantity);
      setQuantity(quantities);
    }
  }, [listCartItem]);

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

                  {listCartItem &&
                    Array.isArray(listCartItem) &&
                    listCartItem.map((item, index) => {
                      TotalSum(
                        item?.product_item?.price || item?.pet_item?.price,
                        check[index]
                      );
                      return (
                        <Row className="info-product" key={index}>
                          <Col md={1}>
                            <Form.Check inline value={check[index]} />
                          </Col>

                          <Col md={4}>
                            <div className="title-product">
                              <img
                                src="https://product.hstatic.net/200000263355/product/z5625317232002_a6d5cca3bb39d486d8870c927d894c21_839973b078544de8bc1a13c2a6aef528_medium.jpg"
                                alt="product"
                              />
                              <div className="ml-5">
                                {item?.product_item?.name ||
                                  item?.pet_item?.name}
                              </div>
                            </div>
                          </Col>
                          <Col md={2}>
                            <div className="price-product ml-10">
                              {item?.product_item?.price ||
                                item?.pet_item?.price}
                              đ
                            </div>
                          </Col>
                          <Col md={2}>
                            <div className="count-product">
                              <span
                                className="minus"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    quantity[index],
                                    item?.product_item?.price ||
                                      item?.pet_item?.price,
                                    "minus"
                                  )
                                }
                              >
                                <MinusOutlined />
                              </span>
                              <input
                                value={quantity[index]}
                                style={{
                                  width: "40px",
                                  height: "34px",
                                  border: "1px solid #ccc",
                                  paddingLeft: "15px",
                                }}
                              />
                              <span
                                className="plus"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    quantity[index],
                                    item?.product_item?.price ||
                                      item?.pet_item?.price,
                                    "plus"
                                  )
                                }
                              >
                                <PlusOutlined />
                              </span>
                            </div>
                          </Col>
                          <Col md={2}>
                            <div className="total-price-product">
                              {item.total_price} đ
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
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
