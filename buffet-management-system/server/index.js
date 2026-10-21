const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();

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

const userRoutes = require("./routes/userRoutes");
const tableRoutes = require("./routes/tableRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const invoiceDetailRoutes = require("./routes/invoiceDetailRoutes");

app.use("/api/users", userRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invoice_details", invoiceDetailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
