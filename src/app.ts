import { configDotenv } from "dotenv";
import express from "express";
import router from "./routes";
import { DB } from "./config/db";
import path from "path";
configDotenv();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

DB.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => console.error("Database connection failed:", err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
