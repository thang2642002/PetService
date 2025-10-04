import express from "express";
import dotenv from "dotenv";
import apiInitWebRouter from "./routers/api.js";
import cors from "cors";
import db from "./models/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8088;
app.use(express.json({ limit: "10mb" })); // Cho phép dữ liệu lên đến 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

apiInitWebRouter(app);

// Test kết nối DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log("Back end running on the PORT = ", PORT);
});
