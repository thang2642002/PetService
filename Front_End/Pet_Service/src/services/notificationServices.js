import axios from "../configs/axiosCustommize";

const getAllNotification = () => {
  return axios.get("/notification/get-all-notification");
};

const createNotification = (message, user_id) => {
  const data = { message, user_id };
  return axios.post("/notification/create-notification", data);
};

const getUserNotification = (user_id) => {
  return axios.get(`/notification/get-user-notification/${user_id}`);
};

const deleteNotification = (id) => {
  return axios.delete(`/notification/delete-notification/${id}`);
};

export {
  getAllNotification,
  createNotification,
  getUserNotification,
  deleteNotification,
};
