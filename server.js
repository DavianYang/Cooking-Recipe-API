const express = require("express");

const app = express();

// Connect Database
const sql = require("./utilites/mysql");

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

// Define API Route
const apiRoute = require("./routes/api");

// Test Route
app.get("/", (req, res) => res.send("API running"));

app.use("/api", apiRoute);

// Create PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
