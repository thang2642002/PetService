import express from "express";
import paginateController from "../controllers/paginateController";
const routes = express.Router();
routes.get("/get-paginated/:model", paginateController.getPaginate);
routes.post("/get-paginated-product/", paginateController.getPaginateProduct);

export default routes;
