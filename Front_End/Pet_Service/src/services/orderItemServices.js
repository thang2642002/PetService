import axios from "../configs/axiosCustommize";

const getAllOrderItem = () => {
  return axios.get("/order-item/get-all-order-item");
};

const createOrderItem = (order_id, items) => {
  const data = { order_id, items };
  return axios.post("/order-item/create-order-item", data);
};

const updateOrderItem = (
  order_item_id,
  order_id,
  product_id,
  quantity,
  total_price
) => {
  const data = { order_id, product_id, quantity, total_price };
  return axios.put(`/order-item/update-order-item/${order_item_id}`, data);
};

const deleteOrderItem = (order_item_id) => {
  return axios.delete(`/order-item/delete-order-item/${order_item_id}`, {
    data: { order_item_id },
  });
};

export { getAllOrderItem, createOrderItem, updateOrderItem, deleteOrderItem };
