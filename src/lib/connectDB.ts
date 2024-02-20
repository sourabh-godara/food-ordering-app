import mongoose from "mongoose";
export default async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error")
    );
    mongoose.connection.on("disconnected", connectDB);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
