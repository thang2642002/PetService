import axios from "../configs/axiosCustommize";

const getAllOrder = () => {
  return axios.get("/order/get-all-order");
};

const getByOrder = (order_id) => {
  return axios.get(`/order/get-oder-by-order/${order_id}`);
};

const getByOrderUser = (user_id) => {
  return axios.get(`/order/get-oder-by-id/${user_id}`);
};
const createOrder = (total_amount, user_id, cart_id) => {
  const data = { total_amount, user_id, cart_id };
  return axios.post("/order/create-order", data);
};

const updateOrder = (order_id, total_amount, status, user_id) => {
  const data = { total_amount, status, user_id };
  return axios.put(`/order/update-order/${order_id}`, data);
};

const deleteOrder = (order_id) => {
  return axios.delete(`/order/delete-order/${order_id}`, {
    data: { order_id },
  });
};

const updateOrderPayment = (order_id) => {
  return axios.put(`/order/update-order-payment/${order_id}`);
};

const getRevenueStats = (year, month) => {
  const params = {};
  if (year) params.year = year;
  if (month) params.month = month;

  return axios.get("/order/revenue", { params });
};

const getOrderStatsByMonth = (year, month) => {
  const params = {};
  if (year) params.year = year;
  if (month) params.month = month;

  return axios.get("/order/order-stats", { params });
};

export {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getByOrder,
  updateOrderPayment,
  getByOrderUser,
  getRevenueStats,
  getOrderStatsByMonth,
};
