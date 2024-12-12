import express from "express";
import sendEmailController from "../controllers/sendEmailController";
const routes = express.Router();
routes.post("/send-email", sendEmailController.sendEmail);

export default routes;
