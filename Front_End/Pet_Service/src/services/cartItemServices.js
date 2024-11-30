import axios from "../configs/axiosCustommize";
const getAllCartItem = () => {
  return axios.get("/cart-item/get-all-cart-item");
};

const createCartItem = (cart_id, item_id, quantity, total_price) => {
  const data = { cart_id, item_id, quantity, total_price };
  return axios.post("/cart-item/create-cart-item", data);
};

const updateCartItem = (cart_item_id, quantity, total_price) => {
  const data = { quantity, total_price };
  return axios.put(`/cart-item/update-cart-item/${cart_item_id}`, data);
};

const deleteCartItem = (cart_item_id) => {
  return axios.delete(`/cart-item/delete-cart-item/${cart_item_id}`, {
    data: { cart_item_id: cart_item_id },
  });
};

export { getAllCartItem, createCartItem, updateCartItem, deleteCartItem };
