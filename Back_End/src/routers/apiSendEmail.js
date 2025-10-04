import express from "express";
import sendEmail from "../controllers/sendEmailController.js";

const routes = express.Router();

routes.post("/send-email", sendEmail);

export default routes;
