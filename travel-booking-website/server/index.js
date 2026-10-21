import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import tourRoute from "./routes/tourRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log(
      "Database connected successfully:",
      res.rows[0]
    );
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/users", userRoute);
app.use("/api/tours", tourRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
