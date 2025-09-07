import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { IoBagOutline } from "react-icons/io5";
import CartItems from "./CartItems";
import CartCheckout from "./CartCheckout";
import { fetchCart } from "@/app/actions/handleCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function CartModal() {
  const session = await getServerSession(authOptions);
  const { data, error, message } = await fetchCart(session);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoBagOutline size={26} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="m-auto text-xl">Cart Items</SheetTitle>
        </SheetHeader>
        {error && <div className="text-center mt-4">{message}</div>}
        {data?.length < 1 ? (
          <div className="flex flex-col gap-2 items-center justify-center h-full">
            <Image
              src={"/emptyCart.png"}
              alt="emptyCart"
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
