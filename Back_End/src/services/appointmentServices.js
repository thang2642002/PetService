import db from "../models/index.js";
import crypto from "crypto";
const getAllAppointment = async () => {
  try {
    const getAllAppointment = await db.Appointments.findAll({
      include: [
        { model: db.Services, as: "service" },
        { model: db.UserPet, as: "user_pet" },
      ],
    });
    return getAllAppointment;
  } catch (error) {
    console.log(error);
  }
};

const getAllAppointmentById = async (id) => {
  try {
    const data = await db.Appointments.findByPk(id, {
      include: [
        { model: db.Services, as: "service" },
        { model: db.UserPet, as: "user_pet" },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createAppointment = async (
  appointment_date,
  end_date_appointment,
  time_date,
  status,
  service_id,
  user_pet_id
) => {
  try {
    const appointment_code = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();
    const createAppointment = await db.Appointments.create({
      appointment_date,
      end_date_appointment,
      time_date,
      status,
      service_id,
      user_pet_id,
      appointment_code,
    });
    return createAppointment;
  } catch (error) {
    console.log(error);
  }
};

const updateAppointment = async (
  appointment_id,
  appointment_date,
  time_date,
  status,
  service_id,
  user_pet_id
) => {
  try {
    const updateAppointment = await db.Appointments.findByPk(appointment_id);
    if (!updateAppointment) {
      return null;
    }
    await updateAppointment.update({
      appointment_date,
      time_date,
      status,
      service_id,
      user_pet_id,
    });
    return updateAppointment;
  } catch (error) {
    console.log(error);
  }
};

const updateAppointmentStatus = async (appointment_id, status) => {
  try {
    const updateAppointment = await db.Appointments.findByPk(appointment_id);
    if (!updateAppointment) {
      return null;
    }
    await updateAppointment.update({
      status,
    });
    return updateAppointment;
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (appointment_id) => {
  try {
    const deleteAppointment = await db.Appointments.destroy({
      where: { appointment_id: appointment_id },
    });
    return deleteAppointment;
  } catch (error) {
    console.log(error);
  }
};

const getUserPetAppointment = async (code) => {
  try {
    const userPet = await db.Appointments.findOne({
      where: {
        appointment_code: code,
      },
      include: [
        { model: db.Services, as: "service" },
        { model: db.UserPet, as: "user_pet" },
      ],
    });
    return userPet;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllAppointment,
  getAllAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getUserPetAppointment,
};
