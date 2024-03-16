"use server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { Cart } from "@/app/api/models/cartModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function removeFromcart(formData: FormData) {
  "use server";
  const itemId = formData.get("productId");
  const { user } = await getServerSession(authOptions);
  try {
    const result = await Cart.findOneAndUpdate(
      { userId: user.id },
      { $pull: { items: { productId: itemId } }, $inc: { total_quantity: -1 } },
      { new: true }
    );
    if (result) {
      console.log(result);
      console.log("Item deleted successfully from the cart");
    } else {
      console.log("Item not found in the cart.");
    }
  } catch (error) {
    console.error("Error deleting item from the cart:", error);
  } finally {
    revalidateTag("cart");
  }
}
