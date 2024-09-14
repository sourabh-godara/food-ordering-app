"use server";

import { Cart } from "@/app/api/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";

// Define the types for the function parameter and return type
interface AddToCartResult {
  success: boolean;
  message: string;
}

export default async function addToCart(id: string): Promise<AddToCartResult> {
  try {
    // Get the user session
    const { user } = await getServerSession(authOptions);

    // Check if the cart exists and update it or create a new cart if it doesn't exist
    const updateResult = await Cart.findOneAndUpdate(
      { userId: user.id },
      {
        $push: { items: { productId: id, quantity: 1 } },
        $inc: { total_quantity: 1 },
      },
      { upsert: true, new: true }
    );

    // Check if the update was successful
    if (updateResult) {
      return { success: true, message: "Added To Cart" };
    } else {
      return { success: false, message: "Something Went Wrong" };
    }
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    return { success: false, message: "Something Went Wrong" };
  } finally {
    // Revalidate the cart tag
    revalidateTag("cart");
  }
}
