import mongoose from "mongoose";
import { Product } from "../../models/productModel";
export async function POST(req: Request, res: Response){
    const body = await req.json();
    console.log("BODY",body);
    mongoose.connect(process.env.MONGODB_URI!)

    const prices= [
        {
            size:'small',
            price:body.price[0]
        },
        {
            size:'medium',
            price:body.price[1]
        },
        {
            size:'large',
            price:body.price[2]
        }
        
]
    delete body.price;
    const product = new Product({
        name: body.name,
        description: body.description,
        prices,
        quantity:body.quantity,
        category:body.category,
        imageUrl:body.imageUrl
    })
    await product.save();
    return Response.json({message:"success"})
}