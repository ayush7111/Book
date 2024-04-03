const express = require("express");
require("dotenv").config();
const bookRoute = require("./routes/bookRoute");
const Db = require("./config/Db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
Db();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/books", bookRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
