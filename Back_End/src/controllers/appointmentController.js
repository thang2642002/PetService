import appointmentService from "../services/appointmentServices";
const getAllAppointment = async (req, res) => {
  try {
    const getAllAppointment = await appointmentService.getAllAppointment();
    if (getAllAppointment) {
      return res.status(200).json({
        message: "Get all appointment is the success",
        errCode: 0,
        data: getAllAppointment,
      });
    } else {
      return res.status(400).json({
        message: "Get all appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Get all appointment is the fails",
      errCode: 1,
    });
  }
};

const getAllAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const getById = await appointmentService.getAllAppointmentById(id);
    if (getById) {
      return res.status(200).json({
        message: "Get all appointment is the success",
        errCode: 0,
        data: getById,
      });
    } else {
      return res.status(400).json({
        message: "Get all appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Get all appointment is the fails",
      errCode: 1,
    });
  }
};

const createAppointment = async (req, res) => {
  try {
    const {
      appointment_date,
      end_date_appointment,
      time_date,
      status,
      service_id,
      user_pet_id,
    } = req.body;
    const createAppointment = await appointmentService.createAppointment(
      appointment_date,
      end_date_appointment,
      time_date,
      status,
      service_id,
      user_pet_id
    );

    if (createAppointment) {
      return res.status(200).json({
        message: "Create appointment is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Create appointment is the fails",
      errCode: 1,
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment_id = req.params.id;
    const { appointment_date, time_date, status, service_id, user_pet_id } =
      req.body;
    const updateAppointment = await appointmentService.updateAppointment(
      appointment_id,
      appointment_date,
      time_date,
      status,
      service_id,
      user_pet_id
    );
    if (updateAppointment) {
      return res.status(200).json({
        message: "Update appointment is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Update appointment is the fails",
      errCode: 1,
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment_id = req.params.id;
    const { status } = req.body;
    const updateAppointment = await appointmentService.updateAppointmentStatus(
      appointment_id,
      status
    );
    if (updateAppointment) {
      return res.status(200).json({
        message: "Update appointment is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Update appointment is the fails",
      errCode: 1,
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment_id = req.params.id;
    const deleteAppointment = await appointmentService.deleteAppointment(
      appointment_id
    );
    if (deleteAppointment) {
      return res.status(200).json({
        message: "Delete appointment is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete appointment is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Delete appointment is the fails",
      errCode: 1,
    });
  }
};

const getUserPetAppointment = async (req, res) => {
  try {
    const { code } = req.params;
    const getUserPet = await appointmentService.getUserPetAppointment(code);
    if (getUserPet) {
      return res.status(200).json({
        errCode: 0,
        message: "Find user pet is the success",
        data: getUserPet,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Find user pet is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Find user pet is the fails",
    });
  }
};

module.exports = {
  getAllAppointment,
  getAllAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getUserPetAppointment,
};
