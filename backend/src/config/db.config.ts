import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_STRING || "mongodb://localhost:27017/admin-flow"
    );
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1);
  }
};

export { connectToDB };
