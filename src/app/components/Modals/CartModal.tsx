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

export default function CartModal() {
  return (
    <Sheet>
      <SheetTrigger>
        <IoBagOutline size={26} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="m-auto text-xl">Cart Items</SheetTitle>
        </SheetHeader>
        <div className="flex justify-between mt-6 bg-accent rounded-xl p-3">
          <div className="flex gap-4">
            <div className="relative w-10 scale-125">
              <Image
                src={"/02.png"}
                layout="fill"
                objectFit="contain"
                alt="cart-product"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-sm text-wrap line-clamp-2">
                Veg. Burgers With Extra Cheese
                <span className="text-gray-500 text-sm">x1</span>
              </h1>
              <h2 className="text-xs line-clamp-2">Description</h2>
              <h3 className=" font-medium text-sm">$342.4</h3>
            </div>
          </div>
          <div className=" cursor-pointer">
            <MdDeleteOutline size={20}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
