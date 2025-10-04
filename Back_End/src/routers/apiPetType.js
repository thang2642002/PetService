import express from "express";
import petTypeController from "../controllers/petTypeController.js";

const routes = express.Router();
routes.get("/get-all-pet-type", petTypeController.getAllPetType);
routes.post("/create-pet-type", petTypeController.createPetType);
routes.put("/update-pet-type/:id", petTypeController.updatePetType);
routes.delete("/delete-pet-type/:id", petTypeController.deletePetType);
routes.get("/get-by-name", petTypeController.getByName);
routes.get("/get-by-id/:id", petTypeController.getById);

export default routes;
