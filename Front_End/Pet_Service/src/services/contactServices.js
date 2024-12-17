import axios from "../configs/axiosCustommize";

const getAllContact = () => {
  return axios.get("/contact/get-all-contact");
};

const createContact = (user_name, email, phone, content) => {
  const data = { user_name, email, phone, content };
  return axios.post("/contact/create-contact", data);
};

export { getAllContact, createContact };
