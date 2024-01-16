import mongoose from "mongoose";
import { Category } from "./../../../models/categoryModel";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
    const body = await req.json();
    console.log("BODY",body);
    mongoose.connect(process.env.MONGODB_URI!)
    await Category.create(body)
    return NextResponse.json({message:"success"})
}