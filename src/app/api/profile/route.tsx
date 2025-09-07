import mongoose from "mongoose";
import User from "../models/userModel";

export async function PUT(req: Request) {
  const { session, username } = await req.json();
  const email = session.user.email;
  mongoose.connect(process.env.MONGODB_URI!);
  const res = await User.updateOne({ email }, { name: username });
  console.log(res);
  return Response.json("ok");
}
