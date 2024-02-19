import mongoose from "mongoose";
export default async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }

  const connectionString = process.env.MONGODB_URI;

  try {
    await mongoose.connect(connectionString);
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
