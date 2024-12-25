import axios from "../configs/axiosCustommize";

const getAllServices = () => {
  return axios.get("/service/get-all-service");
};

const getCountService = () => {
  return axios.get("/service/count-service");
};

const createService = (name, price, description) => {
  const data = { name, price, description };
  return axios.post("/service/create-service", data);
};

const updateService = (service_id, name, price, description) => {
  const data = { name, price, description };
  return axios.put(`/service/update-service/${service_id}`, data);
};

const deleteService = (service_id) => {
  return axios.delete(`/service/delete-service/${service_id}`, {
    data: { service_id },
  });
};

const getByNameServices = (name) => {
  return axios.get(`/service/get-by-name?name=${name}`);
};

export {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getCountService,
  getByNameServices,
};
