"use server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { Cart } from "@/app/api/models/cartModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// TypeScript types
interface ServerSession {
  user: { id: string };
}

export default async function removeFromCart(formData: FormData): Promise<void> {
  "use server";
  const itemId = formData.get("productId");

  // Type guard to ensure itemId is a string
  if (typeof itemId !== "string") {
    console.error("Invalid productId");
    return;
  }

  try {
    const session: ServerSession = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }

    const result = await Cart.findOneAndUpdate(
      { userId: session.user.id },
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
