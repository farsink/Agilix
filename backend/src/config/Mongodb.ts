// src/config/mongodb.config.ts
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGO_URL || "mongodb://localhost:27017";
    const DB_NAME = process.env.MONGODB_NAME || "fitness_app";

    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });

    console.log("✅ MongoDB connected successfully");

    // Add connection event listeners
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
