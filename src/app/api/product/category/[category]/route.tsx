import mongoose from "mongoose";
import { Product } from "../../../models/productModel";

export async function GET(req: Request,{ params}:{params:{category:string}}){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const products = await Product.find({category:params.category});
        return Response.json({data:products,message:"success"})
    } catch (error) {
        console.log("Error in fetching Categories",error)
        return Response.json({error});
    }
   
}