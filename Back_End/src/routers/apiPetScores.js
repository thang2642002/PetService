import express from "express";
import petScoresController from "../controllers/petScoresController";
const routes = express.Router();
routes.get("/get-all-pet-scores", petScoresController.getAllPetScores);
routes.post("/create-pet-scores", petScoresController.createPetScores);
routes.put("/update-pet-scores/:id", petScoresController.updatePetScores);
routes.delete("/delete-pet-scores/:id", petScoresController.deletePetScores);

export default routes;
