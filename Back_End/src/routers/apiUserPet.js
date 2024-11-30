import express from "express";
import userPetController from "../controllers/userPetController";
const routes = express.Router();
routes.get("/get-all-user-pet", userPetController.getAllUserPet);
routes.post("/create-user-pet", userPetController.createUserPet);
routes.put("/update-user-pet/:id", userPetController.updateUserPet);
routes.delete("/delete-user-pet/:id", userPetController.deleteUserPet);
routes.get("/find-by-name", userPetController.findByName);


export default routes;
