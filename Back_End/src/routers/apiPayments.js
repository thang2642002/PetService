import express from "express";
import paymentController from "../controllers/paymentController.js";
const routes = express.Router();
routes.get("/get-all-payment", paymentController.getAllPayment);
routes.post("/create-payment", paymentController.createPayment);
routes.put(
  "/update-payment/:id",

  paymentController.updatePayment
);
// routes.delete("/delete-post/:id", postController.deletePost);

export default routes;
