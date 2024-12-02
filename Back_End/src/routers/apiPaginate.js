import express from "express";
import paginateController from "../controllers/paginateController";
const routes = express.Router();
routes.get("/get-paginated/:model", paginateController.getPaginate);

export default routes;
