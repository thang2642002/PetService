import express from "express";
import CartController from "../controllers/cartController";

const routes = express.Router();
routes.get("/get-all-cart", CartController.getAllCart);
routes.post("/create-cart", CartController.createCart);
routes.put("/update-cart/:id", CartController.updateCart);
routes.delete("/delete-cart/:id", CartController.deleteCart);

export default routes;
