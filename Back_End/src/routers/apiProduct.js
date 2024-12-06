import express from "express";
import productController from "../controllers/productController";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const routes = express.Router();
routes.get("/get-all-product", productController.getAllProduct);
routes.post(
  "/create-product",
  upload.array("images", 5),
  productController.createProduct
);
routes.put(
  "/update-product/:id",
  upload.array("images", 5),
  productController.updateProduct
);
routes.delete("/delete-product/:id", productController.deleteProduct);
routes.get("/find-by-name", productController.findByName);
routes.get("/find-by-id/:id", productController.findById);
routes.get("/find-by-category/:id", productController.findByCategory);
export default routes;
