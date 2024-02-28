import mongoose from "mongoose";
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection
      .once("open", function () {
        console.log("Conection has been made!");
      })
      .on("error", function (error) {
        console.log("Error is: ", error);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
