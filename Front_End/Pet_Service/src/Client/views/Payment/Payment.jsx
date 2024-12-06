import { Row, Col, Button } from "antd";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getByOrder } from "../../../services/orderServices";
import { useEffect, useState } from "react";

const Payment = () => {
  const location = useLocation();
  const { order_id } = location.state || {};
  const [order, setOrder] = useState({});
  const [listOrderItem, setListOrderItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchOrder = async () => {
    const data = await getByOrder(order_id);
    setOrder(data.data);
    setTotalAmount(data.data.total_amount);
    setListOrderItem(data.data.orderItems);
  };
  console.log("check order", order);
  console.log("check listOrderItem", listOrderItem);
  console.log("check totalAmount", totalAmount);

  useEffect(() => {
    fetchOrder();
  }, [order_id]);

  const shippingFee = 30000;
  const finalAmount = totalAmount + shippingFee;

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-md p-6 w-full">
        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            Thông tin giao hàng
          </div>
          <div className="text-sm text-gray-600">
            <div className="block">
              Gmail khách hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.email}
              </span>
            </div>
            <div className="block mt-2">
              Họ và tên khách hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.user_name}
              </span>
            </div>
            <div className="block mt-2">
              Địa chỉ giao hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.address}
              </span>
            </div>
            <div className="block mt-2">
              Số điện thoại khách hàng:
              <span className="font-medium text-gray-800 ml-2">
                {/* {data.user.phone} */}
              </span>
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            Phương thức Thanh toán
          </div>
          <div className="flex flex-col space-y-2">
            <Form.Check
              inline
              label="Thanh toán bằng Ví PayPal"
              name="payment"
              type="radio"
              value="paypall"
              id="1"
              className="mr-2"
            />
            <Form.Check
              inline
              label="Thanh toán khi nhận hàng"
              name="payment"
              value="cod"
              type="radio"
              id="2"
              className="mr-2"
            />
          </div>
        </div>

        {/* Kiểm tra lại đơn hàng */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            KIỂM TRA LẠI ĐƠN HÀNG
          </div>
          <div>
            <Row className="flex items-center justify-between border-b border-[#e5e7eb] pb-3 mb-2">
              <Col xs={6} sm={4} md={2}>
                <div className="text-base font-medium text-gray-800">
                  Hình ảnh
                </div>
              </Col>
              <Col xs={6} sm={8} md={6}>
                <div className="text-base font-medium text-gray-800">
                  Tên sản phẩm
                </div>
              </Col>
              <Col xs={6} sm={4} md={2}>
                <div className="text-sm font-semibold text-gray-700">
                  Số lượng
                </div>
              </Col>
              <Col xs={6} sm={4} md={2}>
                <div className="text-sm font-semibold text-gray-700">
                  Giá sản phẩm
                </div>
              </Col>
            </Row>
          </div>
          {listOrderItem &&
            listOrderItem.map((item, index) => (
              <Row
                key={index}
                className="flex items-center justify-between shadow-sm bg-white rounded-md py-4 px-3 mb-4 hover:shadow-md transition-shadow mt-4"
              >
                <Col
                  xs={6}
                  sm={4}
                  md={2}
                  className="w-16 h-16 overflow-hidden rounded-md"
                >
                  <img
                    src={
                      item?.product_item?.images[0] || item?.pet_item?.images[0]
                    }
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </Col>

                <Col xs={6} sm={8} md={6}>
                  <div className="text-base font-medium text-gray-800">
                    {item?.product_item?.name || item?.pet_item?.name}
                  </div>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <div className="text-sm font-semibold text-gray-700">
                    {item?.quantity}
                  </div>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <div className="text-sm font-semibold text-gray-700">
                    {item?.total_price || "0đ"}
                  </div>
                </Col>
              </Row>
            ))}
        </div>

        {/* Tổng tiền và tiền giao hàng */}
        <div className="mt-6 mb-6 flex flex-col items-end space-y-3">
          <div className="text-base text-gray-800">
            Tiền giao hàng:{" "}
            <span className="text-blue-500">
              {shippingFee.toLocaleString()}đ
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-800">
            Tổng tiền:{" "}
            <span className="text-red-500">
              {finalAmount.toLocaleString()}đ
            </span>
          </div>
        </div>

        {/* Xác nhận đặt hàng */}
        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-500 transition"
          >
            Xác nhận đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
