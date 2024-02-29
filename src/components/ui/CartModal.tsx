import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { Cart } from "@/app/api/models/cartModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function removeFromcart(formData: FormData) {
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
export default async function CartModal({ data }) {
  return (
    <Sheet open>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='m-auto text-xl'>Cart Items</SheetTitle>
          <SheetClose asChild></SheetClose>
        </SheetHeader>
        <div className='grid'>
          {data &&
            data?.map((item) => (
              <div
                key={item?._id}
                className='flex gap-2 justify-between mt-6 bg-accent rounded-xl p-3'>
                <div className='flex gap-4'>
                  <div className='relative w-10 scale-125'>
                    <Image
                      src={item.products?.imageUrl}
                      layout='fill'
                      objectFit='contain'
                      alt='cart-product'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-sm text-wrap line-clamp-1'>
                      {item.products?.name}
                      <span className='text-gray-500 text-sm'>
                        x{item.products?.quantity}
                      </span>
                    </h1>
                    <h2 className='text-xs line-clamp-1 w-60'>
                      {item.products?.description}
                    </h2>
                    <h3 className=' font-medium text-sm'>
                      ${item.products?.prices[0].price}
                    </h3>
                  </div>
                </div>
                <div className=' cursor-pointer'>
                  <form action={removeFromcart}>
                    <button
                      type='submit'
                      name='productId'
                      value={item.products?._id}>
                      <MdDeleteOutline size={20} />
                    </button>
                  </form>
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
