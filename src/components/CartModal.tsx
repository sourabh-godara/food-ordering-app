import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
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
import { IoBagOutline } from "react-icons/io5";
import { Button } from "./ui/button";

async function fetchCart() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    try {
      const res = await fetch(`${process.env.BASE_URL}api/cart`, {
        body: JSON.stringify(session.user?.id),
        next: { tags: ["cart"] },
        method: "POST",
        credentials: "include",
      });
      const { data, error } = await res.json();

      if (error) {
        return { data: null, error: true };
      }
      return { data: data, error: false };
    } catch (error) {
      console.log(error);
      return { data: null, error: true };
    }
  }
  return { data: null, error: true };
}
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
export default async function CartModal() {
  const { data, error } = await fetchCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoBagOutline size={26} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='m-auto text-xl'>Cart Items</SheetTitle>
        </SheetHeader>

        <div className='grid'>
          {error && <div>Something went wrong </div>}
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
        <div className='absolute bottom-6 w-full'>
          <div>
            <div className='mb-4 text-sm text-right mr-12'>
              <div className='t'>
                Total: <strong>$488</strong>
              </div>
              <div className='text-sm'>
                Quantity: x <strong>{data.length}</strong>
              </div>
            </div>
            <div className='flex items-center justify-center mr-7'>
              <Button className='w-[90%]'>Checkout</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
