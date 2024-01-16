import mongoose from "mongoose";
import { Category } from "./../../models/categoryModel";
export async function GET(req: Request, res: Response){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const Categories = await Category.find();
        return Response.json({data:Categories,message:"success"})
    } catch (error) {
        console.log("Error in fetching Categories",error)
        return Response.json({error});
    }
   
}