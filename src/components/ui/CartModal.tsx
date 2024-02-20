import React from "react";
import { IoBagOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Cart } from "@/app/api/models/cartModel";
import { Product } from "@/app/api/models/productModel";
import { Button } from "./button";

async function fetchCart() {
  "use server";
  const { user } = await getServerSession(authOptions);
  if (user.id) {
    try {
      let { items } = await Cart.findOne({ userId: user.id });
      const productPromises = items.map(async (item) => {
        const products = await Product.findById(item.productId);
        return { ...item, products };
      });
      const cartItems = await Promise.all(productPromises);
      return { data: cartItems, error: null };
    } catch (error) {
      console.log("Error fetching cart", error.message);
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
  }
}
export default async function CartModal() {
  const { data, error } = await fetchCart();
  return (
    <Sheet>
      <SheetTrigger>
        <IoBagOutline size={26} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='m-auto text-xl'>Cart Items</SheetTitle>
        </SheetHeader>
        <div className='grid'>
          {data &&
            data.map((item) => (
              <div
                key={item._id}
                className='flex gap-2 justify-between mt-6 bg-accent rounded-xl p-3'>
                <div className='flex gap-4'>
                  <div className='relative w-10 scale-125'>
                    <Image
                      src={item.products.imageUrl}
                      layout='fill'
                      objectFit='contain'
                      alt='cart-product'
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-sm text-wrap line-clamp-2'>
                      {item.products.name}
                      <span className='text-gray-500 text-sm'>
                        x{item.products.quantity}
                      </span>
                    </h1>
                    <h2 className='text-xs line-clamp-1 w-60'>
                      {item.products.description}
                    </h2>
                    <h3 className=' font-medium text-sm'>
                      ${item.products.prices[0].price}
                    </h3>
                  </div>
                </div>
                <div className=' cursor-pointer'>
                  <form action={removeFromcart}>
                    <button
                      type='submit'
                      name='productId'
                      value={item.products._id}>
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
