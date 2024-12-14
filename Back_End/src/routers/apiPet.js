import express from "express";
import petController from "../controllers/petController";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const routes = express.Router();
routes.get("/get-all-pet", petController.getAllPet);
routes.post("/create-pet", upload.array("images", 5), petController.createPet);
routes.put(
  "/update-pet/:id",
  upload.array("images", 5),
  petController.updatePet
);
routes.delete("/delete-pet/:id", petController.deletePet);
routes.get("/find-by-name", petController.findByName);
routes.get("/find-by-id/:id", petController.findById);
routes.get("/count-pet", petController.countPet);

export default routes;
