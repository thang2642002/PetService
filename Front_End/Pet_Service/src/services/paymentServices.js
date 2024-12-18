import axios from "../configs/axiosCustommize";

const getAllPayment = () => {
  return axios.get("/payment/get-all-payment");
};

const createPayments = (order_id, payment_method, amount_paid) => {
  const data = { order_id, payment_method, amount_paid };
  return axios.post("/payment/create-payment", data);
};

const updatePayment = (payment_id) => {
  return axios.put(`/payment/update-payment/${payment_id}`);
};

export { getAllPayment, createPayments, updatePayment };
