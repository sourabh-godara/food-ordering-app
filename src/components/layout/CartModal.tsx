import React from "react";
import {
  Sheet,
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
import { IoBagOutline } from "react-icons/io5";
import CartItems from "./CartItems";
import { Button } from "../ui/button";
import CartCheckout from "./CartCheckout";

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

export default async function CartModal() {
  console.log("cart rendered");
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
        {data.length < 1 ? (
          <div className='flex flex-col gap-2 items-center justify-center h-full'>
            <Image
              src={"/emptyCart.png"}
              alt='emptyCart'
              width={100}
              height={100}
            />
            <h2>Cart is empty</h2>
          </div>
        ) : (
          <>
            <CartItems data={data} />
            <CartCheckout data={data} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
