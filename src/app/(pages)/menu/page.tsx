import Image from "next/image";
import React from "react";
import Categories from "@/components/layout/Categories";
import { Button } from "@/components/ui/button";

export default async function Page() {
  async function fetchProducts() {
    "use server";
    const data = await fetch(`${process.env.BASE_URL}api/product/all`, {
      method: "GET",
      cache:'no-store',
      next: { tags: ["products"] },
    });
    const products = await data.json();
    return products;
  }
  const { data } = await fetchProducts();
  return (
    <>
      <Categories />

      <h2 className="text-lg md:text-2xl font-semibold mt-6 p-3">
        Best of Combos ( Upto 20% OFF)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-8 m-auto w-fit">
        {data.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="grid shadow grid-rows-2 gap-2 cursor-pointer bg-white rounded-xl items-center w-64"
              >
                <div className="relative h-36 ">
                  <Image
                    src={product.imageUrl}
                    layout="fill"
                    objectFit="contain"
                    alt="product"
                  />
                </div>
                <div className="p-2 grid grid-rows-2 gap-1">
                  <div>
                    <h2 className="line-clamp-2 px-2 text-base md:text-lg font-semibold">
                      {product.name}
                    </h2>
                  </div>
                  <div>
                    <p className="line-clamp-3 font-medium text-xs md:text-sm px-2 opacity-80">
                      {product.description}
                    </p>
                  </div>
                  <div className="w-full flex justify-between px-3 mt-2 ">
                    <h3 className="text-base md:text-xl font-semibold">$154</h3>
                    <Button>Add</Button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}