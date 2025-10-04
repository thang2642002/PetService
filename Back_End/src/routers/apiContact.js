import express from "express";
import contactController from "../controllers/contactController.js";

const routes = express.Router();
routes.get("/get-all-contact", contactController.getAllContact);
routes.post("/create-contact", contactController.createContact);

export default routes;
