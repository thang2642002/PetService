import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlices";
import cartSlice from "./Slices/cartSlices";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});
