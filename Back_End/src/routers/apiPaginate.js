import express from "express";
import paginateController from "../controllers/paginateController.js";
const routes = express.Router();
routes.get("/get-paginated/:model", paginateController.getPaginate);
routes.post("/get-paginated-product", paginateController.getPaginateProduct);
routes.post(
  "/get-paginated-product-sort",
  paginateController.getPaginateProductSort
);

export default routes;
