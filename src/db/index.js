import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "../constants.js";

const connectDB = async () => {
  try {
    // Check if Mongo URI exists
    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

export default connectDB;
