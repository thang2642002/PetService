import { Row, Col, Button } from "antd";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getByOrder,
  updateOrderPayment,
} from "../../../services/orderServices";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createPayment } from "../../../services/vnPayServices";
import { sendEmail } from "../../../services/sendEmailServices";
import { createNotification } from "../../../services/notificationServices";
import { createPayments } from "../../../services/paymentServices";
import { updateStockProductOrPet } from "../../../services/orderItemServices";
import { useSelector } from "react-redux";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { order_id } = location.state || {};
  const [order, setOrder] = useState({});
  const [listOrderItem, setListOrderItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const shippingFee = 30000;
  const finalAmount = totalAmount + shippingFee;

  const fetchOrder = async () => {
    const data = await getByOrder(order_id);
    setOrder(data.data);
    setTotalAmount(data.data.total_amount);
    setListOrderItem(data.data.orderItems);
  };

  useEffect(() => {
    fetchOrder();
  }, [order_id]);

  const handlePaymentSelection = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrderCompletion = async () => {
    try {
      const payment = await createPayments(
        order_id,
        "Thanh toán khi nhận hàng",
        "pending",
        finalAmount
      );
      if (payment && payment.errCode === 0) {
        const response = await updateOrderPayment(order_id);
        if (response?.errCode === 0) {
          toast.success("Thanh toán thành công!");
          for (const item of listOrderItem) {
            const { item_id, quantity } = item;
            await updateStockProductOrPet(item_id, quantity);
          }
          navigate(`/order-details`, {
            state: { dataOrder: order, totalAmount: finalAmount },
          });
          await sendEmail(order?.user?.email, listOrderItem);
          await createNotification(
            "Cảm ơn quý khách đã mua sản phẩm bên chúng tôi",
            user?.data?.user_id
          );
        }
      }
    } catch (error) {
      toast.error(
        "Có lỗi xảy ra trong quá trình cập nhật thông tin thanh toán."
      );
    }
  };

  const handlePayPalSuccess = async () => {
    try {
      const payment = await createPayments(
        order_id,
        "Thanh toán PayPal",
        "completed",
        finalAmount
      );
      if (payment && payment.errCode === 0) {
        const response = await updateOrderPayment(order_id);
        if (response?.errCode === 0) {
          toast.success("Thanh toán qua PayPal thành công!");
          navigate(`/order-details`, {
            state: { dataOrder: order, totalAmount: finalAmount },
          });
          await sendEmail(order?.user?.email, listOrderItem);
          await createNotification(
            "Cảm ơn quý khách đã mua sản phẩm bên chúng tôi",
            user?.data?.user_id
          );
        }
      }
    } catch (error) {
      toast.error("Có lỗi trong việc xác nhận thanh toán qua PayPal");
    }
  };

  const handleVNPayPayment = async () => {
    try {
      const paymentUrl = await createPayment(finalAmount, order_id, order_id);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán VNPay.");
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-md p-6 w-full">
        <div className="mb-6">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            Thông tin giao hàng
          </div>
          <div className="text-sm text-gray-600">
            <div>
              Gmail khách hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.email}
              </span>
            </div>
            <div>
              Họ và tên khách hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.user_name}
              </span>
            </div>
            <div>
              Địa chỉ giao hàng:
              <span className="font-medium text-gray-800 ml-2">
                {order?.user?.address}
              </span>
            </div>
          </div>
        </div>

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
              value="paypal"
              onChange={handlePaymentSelection}
              id="1"
              checked={paymentMethod === "paypal"}
            />
            <Form.Check
              inline
              label="Thanh toán khi nhận hàng"
              name="payment"
              type="radio"
              value="cod"
              onChange={handlePaymentSelection}
              id="2"
              checked={paymentMethod === "cod"}
            />
            <Form.Check
              inline
              label="Thanh toán VnPay"
              name="payment"
              type="radio"
              value="vnPay"
              onChange={handlePaymentSelection}
              id="3"
              checked={paymentMethod === "vnPay"}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          {paymentMethod === "paypal" && (
            <div className="flex-grow flex justify-end">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQkhqIAXG8UUCbDP1riqoBlLqHqGKty3RUXPYygYP9hkse2takNR_Czx-LN-XGJMCAikZuvnfY49L-4X",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "horizontal",
                    height: 40,
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: (finalAmount / 32000).toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(() => {
                      handlePayPalSuccess();
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="flex-grow flex justify-end">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-500 transition"
                onClick={handleOrderCompletion}
              >
                Xác nhận đặt hàng
              </Button>
            </div>
          )}

          {paymentMethod === "vnPay" && (
            <div className="flex-grow flex justify-end">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:bg-blue-500 transition"
                onClick={handleVNPayPayment}
              >
                Thanh toán VnPay
              </Button>
            </div>
          )}
        </div>

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
      </div>
    </div>
  );
};

export default Payment;
