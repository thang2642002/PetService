import express from "express";
import serviceController from "../controllers/serviceController";

const routes = express.Router();
routes.get("/get-all-service", serviceController.getAllService);
routes.post("/create-service", serviceController.createService);
routes.put("/update-service/:id", serviceController.updateService);
routes.delete("/delete-service/:id", serviceController.deleteService);
routes.get("/get-by-id/:id", serviceController.getById);
routes.get("/get-by-name", serviceController.getByName);
routes.get("/count-service", serviceController.countService);

export default routes;
