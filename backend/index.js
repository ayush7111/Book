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

// CORS Configuration
const allowedOrigins = [
  "https://book-frontend-rppz.onrender.com/",
  "http://localhost:5173",
]; // Add your frontend domain here
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Routes
app.use("/api/books", bookRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
