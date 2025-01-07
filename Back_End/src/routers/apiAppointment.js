import express from "express";
import appointmentController from "../controllers/appointmentController";

const routes = express.Router();
routes.get("/get-all-appointment", appointmentController.getAllAppointment);
routes.get("/get-user-pet-appointment/:code", appointmentController.getUserPetAppointment);
routes.get(
  "/get-by-id-appointment/:id",
  appointmentController.getAllAppointmentById
);
routes.post("/create-appointment", appointmentController.createAppointment);
routes.put("/update-appointment/:id", appointmentController.updateAppointment);
routes.put(
  "/update-appointment-status/:id",
  appointmentController.updateAppointmentStatus
);
routes.delete(
  "/delete-appointment/:id",
  appointmentController.deleteAppointment
);

export default routes;
