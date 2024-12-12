import axios from "../configs/axiosCustommize";

const sendEmail = (email, order) => {
  const data = { email, order };
  return axios.post("/email/send-email", data);
};

export { sendEmail };
