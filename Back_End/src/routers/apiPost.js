import express from "express";
import postController from "../controllers/postController.js";
import { upload } from "../config/cloudinaryConfig.js";
const routes = express.Router();
routes.get("/get-all-post", postController.getAllPost);
routes.get("/get-post-by-id/:id", postController.getPostById);
routes.post("/create-post", upload.single("image"), postController.createPost);
routes.put(
  "/update-post/:id",
  upload.single("image"),
  postController.updatePost
);
routes.delete("/delete-post/:id", postController.deletePost);
routes.get("/count-post", postController.countPost);

export default routes;
