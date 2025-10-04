import express from "express";
import petReviewController from "../controllers/petReviewController.js";

const routes = express.Router();
routes.get("/get-all-pet-review", petReviewController.getAllPetReview);
routes.get("/get-pet-review-by-id/:id", petReviewController.getByPetReviewId);
routes.post("/create-pet-review", petReviewController.createPetReview);
routes.put("/update-pet-review/:id", petReviewController.updatePetReview);
routes.delete("/delete-pet-review/:id", petReviewController.deletePetReview);

export default routes;
