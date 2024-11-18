import express from "express";
import appointmentController from "../controllers/appointmentController";

const routes = express.Router();
routes.get("/get-all-appointment", appointmentController.getAllAppointment);
routes.post("/create-appointment", appointmentController.createAppointment);
routes.put("/update-appointment/:id", appointmentController.updateAppointment);
routes.delete(
  "/delete-appointment/:id",
  appointmentController.deleteAppointment
);

export default routes;
