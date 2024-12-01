import axios from "../configs/axiosCustommize";

const getAllCart = () => {
  return axios.get("/cart/get-all-cart");
};

const createCart = (user_id, total_amount) => {
  const data = { user_id, total_amount };
  return axios.post("/cart/create-cart", data);
};

const updateCart = (cart_id, user_id, total_amount) => {
  const data = { user_id, total_amount };
  return axios.put(`/cart/update-cart/${cart_id}`, data);
};

const deleteCart = (cart_id) => {
  return axios.delete(`/cart/delete-cart/${cart_id}`, {
    data: { cart_id: cart_id },
  });
};

const getByCartId = (cart_id) => {
  return axios.get(`/cart/get-by-cart-id/${cart_id}`, {
    data: { cart_id: cart_id },
  });
};

export { createCart, updateCart, deleteCart, getAllCart, getByCartId };
