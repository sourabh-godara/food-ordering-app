"use server";
import { Cart } from "@/app/api/models/cartModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
export default async function addToCart(id) {
  try {
    const { user } = await getServerSession(authOptions);
    const cartExists = await Cart.find({ userId: user.id });
    if (cartExists) {
      await Cart.findOneAndUpdate(
        { userId: user.id },
        {
          $push: {
            items: {
              productId: id,
              quantity: 1,
            },
          },
          $inc: { total_quantity: 1 },
        },
        {
          upsert: true,
        }
      );
      return { success: true, message: "Added To Cart" };
    } else {
      try {
        const cartItem = new Cart({
          userId: user.id,
          items: [
            {
              productId: id,
              quantity: 1,
            },
          ],
        });
        await cartItem.save();
        return { success: true, message: "Added To Cart" };
      } catch (error) {
        console.log("Error adding to cart", error.message);
        return { success: false, message: "Something Went Wrong" };
      }
    }
  } catch (error) {
    console.log("Something went wrong", error.message);
    return { success: false, message: "Something Went Wrong" };
  } finally {
    revalidateTag("cart");
  }
}
