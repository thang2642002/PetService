import axios from "../configs/axiosCustommize";

const createPayment = async (amount, orderInfo, order_id) => {
  try {
    const response = await axios.post("/vnPay/create-payment", {
      amount,
      orderInfo,
      order_id,
    });

    return response?.url;
  } catch (error) {
    console.error("Error creating VNPay payment URL", error);
    throw error;
  }
};

const handleVNPayReturn = (query) => {
  return axios.get(`/vnPay/payment-return?query=${query}`);
};

export { createPayment, handleVNPayReturn };
