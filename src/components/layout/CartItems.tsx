"use client";
import { removeFromCart } from "@/app/actions/handleCart";
import Image from "next/image";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function CartItems({ data }) {
  return (
    <>
      {data &&
        data?.map((item) => (
          <div
            key={item?._id}
            className="flex gap-2 justify-between mt-6 bg-accent rounded-xl p-3"
          >
            <div className="flex gap-4">
              <div className="relative w-10 scale-125">
                <Image
                  src={item?.imageUrl}
                  layout="fill"
                  objectFit="contain"
                  alt="cart-product"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm text-wrap line-clamp-1">
                  {item?.name}
                  <span className="text-gray-500 text-sm">
                    x{item?.quantity}
                  </span>
                </h1>
                <h2 className="text-xs line-clamp-1 w-60">
                  {item?.description}
                </h2>
                <h3 className=" font-medium text-sm">
                  ${item?.prices[0].price}
                </h3>
              </div>
            </div>
            <div className=" cursor-pointer">
              <form
                action={async (formData) => {
                  await removeFromCart(formData);
                }}
              >
                <button type="submit" name="productId" value={item?._id}>
                  <MdDeleteOutline size={20} />
                </button>
              </form>
            </div>
          </div>
        ))}
    </>
  );
}
