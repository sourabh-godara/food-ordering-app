import { Cart } from "../models/cartModel";
import { Product } from "../models/productModel";

export async function POST(req: Request, res) {
  const userId = await req.json();
  if (!userId) {
    return Response.json({ data: null, error: true });
  }
  try {
    let { items } = await Cart.findOne({ userId });
    const productPromises = items.map(async (item) => {
      const products = await Product.findById(item.productId);
      return { ...item, products };
    });
    const cartItems = await Promise.all(productPromises);
    return Response.json({ data: cartItems, error: null });
  } catch (error) {
    console.error(error);
    return Response.json({ data: null, error: true });
  }
}
