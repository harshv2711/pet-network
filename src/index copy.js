import express from "express";
import mongoose from "mongoose";
import { DB_NAME, MONGO_URI, PORT } from "./constants.js";

const app = express();

(async () => {
  try {
    // Ensure MONGO_URI is defined
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB
    const connection = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);

    // Handle express-level errors before starting the server
    app.on("error", (err) => {
      console.error("❌ Express error:", err);
    });

    // Start the server after successful DB connection
    app.listen(PORT || 8000, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
})();
