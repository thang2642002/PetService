import { createSlice } from "@reduxjs/toolkit";

// Slice giỏ hàng
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    items: [],
    totalItems: 0, // Tổng số lượng sản phẩm trong giỏ hàng
    totalAmount: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartId = action.payload.cartId;
      state.items = action.payload.items;
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = action.payload.items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
    },
    updateItemQuantity: (state, action) => {
      const { cartItemId, quantity, totalPrice } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.cart_item_id === cartItemId
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        state.items[itemIndex].total_price = totalPrice;
      }

      // Cập nhật lại tổng số lượng và tổng tiền
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);

      // Cập nhật lại tổng số lượng và tổng tiền
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
    },
  },
});

export const { setCart, updateItemQuantity, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
