import mongoose from "mongoose";
import { Product } from "../../models/productModel";
export async function GET(req: Request, res: Response){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const products = await Product.find();
        return Response.json({data:products,message:"success"})
    } catch (error) {
        console.log("Error in fetching products",error)
        return Response.json({error});
    }
   
}