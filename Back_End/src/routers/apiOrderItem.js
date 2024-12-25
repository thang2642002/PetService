import express from "express";
import orderItemController from "../controllers/orderItemController";
const routes = express.Router();
routes.get("/get-all-order-item", orderItemController.getAllOrderItem);
routes.post("/create-order-item", orderItemController.createOrderItem);
routes.post(
  "/update-stock-productOrPet",
  orderItemController.updateStockProductOrPet
);
routes.put("/update-order-item/:id", orderItemController.updateOrderItem);
routes.delete("/delete-order-item/:id", orderItemController.deleteOrderItem);

export default routes;
