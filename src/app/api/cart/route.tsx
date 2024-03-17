import connectDB from "@/lib/connectDB";
import { Cart } from "../models/cartModel";
import { Product } from "../models/productModel";

export async function POST(req: Request, res) {
  const userId = await req.json();
  if (!userId) {
    return Response.json({ data: null, error: true });
  }
  try {
    await connectDB();
    const { items } = await Cart.findOne({ userId });
    let cartItems = [];

    for (let i = 0; i < items.length; i++) {
      cartItems[i] = await Product.findById(items[i].productId);
    }

    return Response.json({ data: cartItems, error: null });
  } catch (error) {
    console.error(error);
    return Response.json({ data: null, error: true });
  }
}
