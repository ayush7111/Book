const mongoose = require("mongoose");
const Db = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};
module.exports = Db;
