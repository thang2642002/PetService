import express from "express";
import orderController from "../controllers/orderController";
const routes = express.Router();
routes.get("/get-all-order", orderController.getAllOrder);
routes.post("/create-order", orderController.createOrder);
routes.put("/update-order/:id", orderController.updateOrder);
routes.delete("/delete-order/:id", orderController.deleteOrder);

export default routes;
