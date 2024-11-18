import express from "express";
import postController from "../controllers/postController";
const routes = express.Router();
routes.get("/get-all-post", postController.getAllPost);
routes.post("/create-post", postController.createPost);
routes.put("/update-post/:id", postController.updatePost);
routes.delete("/delete-post/:id", postController.deletePost);

export default routes;
