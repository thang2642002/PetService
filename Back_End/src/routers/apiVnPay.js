import express from "express";
import vnPayController from "../controllers/vnPayController.js";
const routes = express.Router();
routes.post("/create-payment", vnPayController.createPayment);
routes.get("/payment-return", vnPayController.handleReturn);

export default routes;
