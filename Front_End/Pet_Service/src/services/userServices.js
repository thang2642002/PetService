import axios from "../configs/axiosCustommize";
const getAllUser = () => {
  return axios.get("/user/get-all-user");
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

const deleteUser = (user_id) => {
  return axios.delete(`/user/delete-user/${user_id}`, { data: { user_id } });
};

export { getAllUser, createUser, deleteUser };
