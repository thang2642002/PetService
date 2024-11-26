import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    user_id: "",
    email: "",
    password: "",
    user_name: "",
    phone: "",
    address: "",
    role: "",
    avatar: "",
    access_tokens: "",
    refresh_tokens: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        user_id: "",
        email: "",
        password: "",
        user_name: "",
        phone: "",
        address: "",
        role: "",
        avatar: "",
        access_tokens: "",
        refresh_tokens: "",
      };
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
