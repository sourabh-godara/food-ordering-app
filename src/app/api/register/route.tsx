import mongoose from "mongoose";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
export async function POST(req:Request){
    const body = await req.json();
    mongoose.connect(process.env.MONGODB_URI!)
    const user = await User.findOne({email:body.email});
    if (user){
        return Response.json({message:"User already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    await User.create({username:body.username,email:body.email, password:hashedPassword});

    console.log("user created");
    return Response.json('ok')
}