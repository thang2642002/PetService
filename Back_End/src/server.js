import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiInitWebRouter from "./routers/api.js";
import cors from "cors";

const app = express();
const PORT = 8080 || 8088;
app.use(express.json({ limit: "10mb" })); // Cho phép dữ liệu lên đến 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Địa chỉ frontend
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

apiInitWebRouter(app);

app.listen(PORT, () => {
  console.log("Back end running on the PORT = ", PORT);
});
