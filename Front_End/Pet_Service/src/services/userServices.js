import axios from "../configs/axiosCustommize";

const getAllUser = () => {
  return axios.get("/user/get-all-user");
};

const getUserById = (user_id) => {
  return axios.get(`/user/find-by-id/${user_id}`, { data: { user_id } });
};

const getCountUser = () => {
  return axios.get("/user/count-user");
};

const createUser = (
  email,
  password,
  user_name,
  phone,
  address,
  role,
  avatar
) => {
  const dataUser = new FormData();
  dataUser.append("email", email);
  dataUser.append("password", password);
  dataUser.append("user_name", user_name);
  dataUser.append("address", phone);
  dataUser.append("phone", address);
  dataUser.append("role", role);
  dataUser.append("avatar", avatar);
  return axios.post("/user/create-user", dataUser);
};

const updateUser = (
  user_id,
  email,
  password,
  user_name,
  phone,
  address,
  role,
  avatar
) => {
  const dataUser = new FormData();
  dataUser.append("email", email);
  dataUser.append("password", password);
  dataUser.append("user_name", user_name);
  dataUser.append("address", phone);
  dataUser.append("phone", address);
  dataUser.append("role", role);
  dataUser.append("avatar", avatar);
  return axios.put(`/user/update-user/${user_id}`, dataUser);
};

const deleteUser = (user_id) => {
  return axios.delete(`/user/delete-user/${user_id}`, { data: { user_id } });
};
const registerUser = (email, user_name, phone, address, password) => {
  const data = { email, user_name, phone, address, password };
  return axios.post("/user/register", data);
};

const loginUser = (email, password) => {
  const data = { email, password };
  return axios.post("/user/login", data);
};

const logoutUser = () => {
  return axios.post("/user/logout");
};

export {
  getAllUser,
  createUser,
  updateUser,
  getCountUser,
  deleteUser,
  loginUser,
  registerUser,
  getUserById,
  logoutUser,
};
