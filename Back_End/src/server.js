import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiInitWebRouter from "./routers/api.js";
import cors from "cors";

const app = express();
const PORT = 8091 || 8088;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

apiInitWebRouter(app);

app.listen(PORT, () => {
  console.log("Back end running on the PORT = ", PORT);
});
