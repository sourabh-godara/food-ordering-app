"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ProductType } from "@/app/api/models/productModel";
import { Button } from "../ui/button";
import addToCart from "@/app/actions/handleCart";
import Loading from "./Loading";

interface ProductCardsProps {
  products: ProductType[];
}

export default function ProductCards({ products }: ProductCardsProps) {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  async function handleCart(productId: string) {
    if (status === "unauthenticated") {
      toast.error("Login First");
      return;
    }

    startTransition(async () => {
      try {
        const { success, message } = await addToCart(productId);
        toast[success ? "success" : "error"](message);
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <>
      <div>
        {products.map((product) => {
          return (
            <div
              key={product._id.toString()}
              className="bg-accent w-fit p-3 rounded-md m-3 w-48"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-full m-auto"
              />
              <div className="flex mt-2 p-2 max-w-48 gap-3 justify-between items-center">
                <h1 className="font-medium">{product.name}</h1>
                <span className=" font-semibold">
                  ${product?.prices[0].price}
                </span>
              </div>

              <Button
                className="w-full"
                disabled={isPending}
                onClick={() => handleCart(product._id.toString())}
              >
                {isPending ? <Loading /> : "Add to Cart"}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
