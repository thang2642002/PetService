import express from "express";
import userController from "../controllers/userControler";
import { upload } from "../config/cloudinaryConfig";

const routes = express.Router();
routes.get("/get-all-user", userController.getAllUser);
routes.post("/create-user", upload.single("avatar"), userController.createUser);
routes.put(
  "/update-user/:id",
  upload.single("avatar"),
  userController.updateUser
);
routes.delete("/delete-user/:id", userController.deleteUser);
routes.get("/find-by-name", userController.findByName);
routes.get("/find-by-id/:id", userController.findById);
routes.post("/register", userController.handleRegister);
routes.post("/login", userController.handleLogin);
routes.post("/logout", userController.handleLogout);

export default routes;
