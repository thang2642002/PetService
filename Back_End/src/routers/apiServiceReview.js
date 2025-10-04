import express from "express";
import serviceReviewController from "../controllers/serviceReviewController.js";
const routes = express.Router();
routes.get(
  "/get-all-service-review",
  serviceReviewController.getAllServiceReview
);
routes.post(
  "/create-service-review",
  serviceReviewController.createServiceReview
);
routes.put(
  "/update-service-review/:id",
  serviceReviewController.updateServiceReview
);

routes.delete(
  "/delete-service-review/:id",
  serviceReviewController.deleteServiceReview
);
export default routes;
