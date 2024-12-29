import axios from "../configs/axiosCustommize";

const getAllAppointment = () => {
  return axios.get("/appointment/get-all-appointment");
};

const getAppointmentById = (appointment_id) => {
  return axios.get(`/appointment/get-by-id-appointment/${appointment_id}`);
};

const createAppointment = (
  appointment_date,
  time_date,
  status,
  service_id,
  user_pet_id
) => {
  const data = { appointment_date, time_date, status, service_id, user_pet_id };
  return axios.post("/appointment/create-appointment", data);
};

const updateAppointment = (
  appointment_id,
  appointment_date,
  time_date,
  status,
  service_id,
  user_pet_id
) => {
  const data = { appointment_date, time_date, status, service_id, user_pet_id };
  return axios.put(`/appointment/update-appointment/${appointment_id}`, data);
};

const updateAppointmentStatus = (appointment_id, status) => {
  const data = { status };
  return axios.put(
    `/appointment/update-appointment-status/${appointment_id}`,
    data
  );
};

const deleteAppointment = (appointment_id) => {
  return axios.delete(`/appointment/delete-appointment/${appointment_id}`, {
    data: { appointment_id },
  });
};

export {
  getAllAppointment,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentById,
};
