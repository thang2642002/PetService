import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const __filename = path.resolve();
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

// Khởi tạo Sequelize với thông tin từ .env
const sequelize = new Sequelize.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// Đọc tất cả file model trong thư mục này (trừ index.js)
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.endsWith(".test.js")
  );

for (const file of files) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Nếu model có associate thì chạy
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
