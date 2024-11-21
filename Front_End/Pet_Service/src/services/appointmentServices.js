import axios from "../configs/axiosCustommize";

const getAllAppointment = () => {
  return axios.get("/appointment/get-all-appointment");
};

const createAppointment = (status, service_id, user_pet_id) => {
  const data = { status, service_id, user_pet_id };
  return axios.post("/appointment/create-appointment", data);
};

const deleteAppointment = (appointment_id) => {
  return axios.delete(`/appointment/delete-appointment/${appointment_id}`, {
    data: { appointment_id },
  });
};

export { getAllAppointment, createAppointment, deleteAppointment };
