import express from "express";
import productReviewController from "../controllers/productReviewController.js";

const routes = express.Router();
routes.get(
  "/get-all-product-review",
  productReviewController.getAllProductReview
);

routes.get(
  "/get-product-review-by-id/:id",
  productReviewController.getByProductReviewId
);

routes.post(
  "/create-product-review",
  productReviewController.createProductReview
);

routes.put(
  "/update-product-review/:id",
  productReviewController.updateProductReview
);

routes.delete(
  "/delete-product-review/:id",
  productReviewController.deleteProductReview
);

export default routes;
