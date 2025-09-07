import mongoose from "mongoose";
import User from "../models/userModel";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  mongoose.connect(process.env.MONGODB_URI!);
  const user = await User.findOne({ email });
  if (user) {
    return Response.json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.create({ name, email, password: hashedPassword });
  console.log("user created");
  return Response.json({ message: "User Registered" });
}
