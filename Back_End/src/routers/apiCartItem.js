import express from "express";
import CartItemController from "../controllers/cartItemController.js";

const routes = express.Router();
routes.get("/get-all-cart-item", CartItemController.getAllCartItem);
routes.post("/create-cart-item", CartItemController.createCartItem);
routes.put("/update-cart-item/:id", CartItemController.updateCartItem);
routes.delete("/delete-cart-item/:id", CartItemController.deleteCartItem);

export default routes;
