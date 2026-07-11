const mongoose = require("mongoose");

// Load environment variables
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined. Please check your .env file.");
}

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("✅ Database Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  });
