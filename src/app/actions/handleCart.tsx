"use server";
import "server-only";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import Cart from "@/app/api/models/cartModel";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/connectDB";
import Product from "../api/models/productModel";

interface ServerSession {
  user: { id: string };
}
interface SessionUser {
  id: string;
}

export default async function addToCart(productId: string) {
  try {
    console.log("addtocart");
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { success: true, message: "unauthorised" };
    }
    const updateResult = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      {
        $push: { items: { productId: productId, quantity: 1 } },
        $inc: { total_quantity: 1 },
      },
      { upsert: true, new: true }
    );

    if (!updateResult) {
      return { success: false, message: "Something Went Wrong" };
    }
    return { success: true, message: "Added To Cart" };
  } catch (error) {
    return { success: false, message: "Something Went Wrong" };
  }
}
export async function fetchCart() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { data: [], error: true, message: "unauthorised" };
    }

    const userId = (session.user as SessionUser).id;
    await connectDB();
    const cart = await Cart.findOne({ userId }).lean();
    if (!cart || cart.items.length === 0) {
      return { data: [], error: false, message: "success" };
    }

    const productIds = cart.items.map((i) => i.productId);

    const cartItems = await Product.find({ _id: { $in: productIds } }).lean();

    return {
      data: JSON.parse(JSON.stringify(cartItems)),
      error: false,
      message: "success",
    };
  } catch (error: any) {
    return { data: [], error: true, message: error.message };
  }
}

export async function removeFromCart(formData: FormData) {
  const itemId = formData.get("productId");

  if (typeof itemId !== "string") {
    return { success: false, message: "Invalid Product" };
  }

  try {
    const session: ServerSession = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, message: "unauthorised" };
    }

    const result = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { items: { productId: itemId } }, $inc: { total_quantity: -1 } },
      { new: true }
    );

    if (!result) {
      return { success: false, message: "Product Not Found" };
    }
    return { success: true, message: "Product Removed From Cart" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  } finally {
    revalidateTag("cart");
  }
}
