"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import addToCart from "@/app/(pages)/menu/[category]/components/addTocart";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { Product } from "@/app/(pages)/menu/[category]/components/Products";

interface ProductCardsProps {
  products: Product[];
}

export default function ProductCards({ products }: ProductCardsProps) {
  const { status } = useSession();

  async function handleForm(formData: FormData) {
    if (status === "unauthenticated") {
      return { message: "Please login first" };
    }
    const { productid } = Object.fromEntries(formData);
    const res = await addToCart(productid as string);
    if (!res.success) {
      toast({
        variant: "destructive",
        title: res.message,
      });
      return;
    } else {
      toast({
        variant: "default",
        title: res.message,
      });
    }
  }

  return (
    <>
      <Toaster />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-2 md:gap-8 m-auto'>
        {products?.map((product) => (
          <div
            key={product._id}
            className='grid shadow bg-white dark:bg-accent grid-rows-2 md:grid-rows-none cursor-pointer rounded-xl w-[10.5rem] m-auto md:w-52 h-64 md:h-80'
          >
            <div className='relative h-36'>
              <Image
                src={product.imageUrl}
                layout='fill'
                objectFit='contain'
                alt='product'
              />
            </div>
            <div className='p-1 md:p-2 grid grid-rows-2 md:grid-rows-1 mt-4 md:mt-0'>
              <div>
                <h2 className='line-clamp-2 px-1 text-sm md:text-base font-medium md:font-semibold'>
                  {product.name}
                </h2>
              </div>
              <div>
                <p className='line-clamp-2 md:line-clamp-3 mt-1 md:mt-2 font-medium text-xs md:text-xs px-1 opacity-80'>
                  {product.description}
                </p>
              </div>
            </div>
            <div className='w-full flex justify-between items-center px-2 md:px-3'>
              <h3 className='text-base md:text-lg font-semibold'>$154</h3>
              <form action={handleForm}>
                <Button
                  type='submit'
                  value={product._id}
                  name='productid'
                  className='mb-3'
                >
                  Add
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
