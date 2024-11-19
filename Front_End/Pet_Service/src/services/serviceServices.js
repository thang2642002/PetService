import axios from "../configs/axiosCustommize";

const getAllServices = () => {
  return axios.get("/service/get-all-service");
};

const createService = (name, price, description) => {
  const data = { name, price, description };
  return axios.post("/service/create-service", data);
};

const deleteService = (service_id) => {
  return axios.delete(`/service/delete-service/${service_id}`, {
    data: { service_id },
  });
};

export { getAllServices, createService, deleteService };
