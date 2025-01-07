import express from "express";
import orderController from "../controllers/orderController";
const routes = express.Router();
routes.get("/get-all-order", orderController.getAllOrder);
routes.get("/get-oder-by-id/:id", orderController.getOrderById);
routes.get("/get-oder-by-order/:id", orderController.getOrderByOrder);
routes.post("/create-order", orderController.createOrder);
routes.put("/update-order/:id", orderController.updateOrder);
routes.put("/update-order-payment/:id", orderController.updateOrderPayment);
routes.delete("/delete-order/:id", orderController.deleteOrder);
routes.get("/revenue", orderController.getRevenueStats);

export default routes;
