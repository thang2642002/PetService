import express from "express";
import categoryController from "../controllers/categoryController";

const routes = express.Router();
routes.get("/get-all-category", categoryController.getAllCategory);
routes.post("/create-category", categoryController.createCategory);
routes.put("/update-category/:id", categoryController.updateCategory);
routes.delete("/delete-category/:id", categoryController.deleteCategory);
routes.get("/find-by-name", categoryController.findByName);
routes.get("/find-by-id/:id", categoryController.findById);
export default routes;
