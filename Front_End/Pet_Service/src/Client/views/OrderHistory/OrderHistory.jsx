import React, { useEffect, useState } from "react";
import { getByOrderUser } from "../../../services/orderServices";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const OrderHistory = () => {
  const { user } = useSelector((state) => state.user);
  const [listOrder, setListOrder] = useState([]);

  const fetchListOrder = async () => {
    const data = await getByOrderUser(user?.data?.user_id);
    if (data && data.errCode === 0) {
      setListOrder(data.data);
    }
  };

  useEffect(() => {
    fetchListOrder();
  }, [user]);

  console.log("listOrder", listOrder);

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Lịch sử mua hàng</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Lịch Sử Đơn Hàng</h1>
      {listOrder &&
        listOrder.map((order, index) => {
          return (
            <div
              className="border rounded-lg p-4 mb-6 bg-white shadow"
              key={order.order_id}
            >
              <div className="mb-4">
                <h2 className="text-lg font-bold">
                  Mã đơn hàng: {order.order_id}
                </h2>
                <p>
                  Ngày đặt hàng: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>Tổng tiền: {order.total_amount.toLocaleString()} đ</p>
                <p>
                  Trạng thái:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status === "completed" ? "Hoàn tất" : "Đã hủy"}
                  </span>
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-bold">
                  Sản phẩm trong đơn hàng:
                </h4>
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item, index) => {
                    return (
                      <div
                        className="grid grid-cols-5 gap-4 items-center border p-3 mb-2 order-item"
                        key={index}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              item.product_item?.images[0] ||
                              item.pet_item?.images[0]
                            }
                            alt={item.product_item?.name || item.pet_item?.name}
                            className="w-16 h-16 rounded shadow object-cover"
                          />
                        </div>

                        <div className="font-semibold text-center">
                          {item.product_item?.name || item.pet_item?.name}
                        </div>

                        <div className="text-sm text-gray-600 text-center">
                          Giá:{" "}
                          {(
                            Number(
                              item.product_item?.price || item.pet_item?.price
                            ) || 0
                          ).toLocaleString()}{" "}
                          đ
                        </div>

                        <div className="text-center">
                          Số lượng: {item.quantity}
                        </div>

                        <div className="text-center">
                          Tổng tiền: {item.total_price.toLocaleString()} đ
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderHistory;
