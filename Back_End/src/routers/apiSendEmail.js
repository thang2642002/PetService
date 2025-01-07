import express from "express";
import sendEmailController from "../controllers/sendEmailController";
const routes = express.Router();
routes.post("/send-email", sendEmailController.sendEmail);
// routes.post("/send-email-forgetPass", sendEmailController.sendEmailForgetPass);

export default routes;
