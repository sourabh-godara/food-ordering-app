import Image from "next/image";
import React, { Suspense } from "react";
import Categories from "@/components/layout/Categories";
import { Button } from "@/components/ui/button";
import Loading from "@/components/layout/Loading";
//bg white dark

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  async function fetchProducts() {
    "use server";
    /* const data = await fetch(`${process.env.BASE_URL}api/product/all`, {
      method: "GET",
      cache: "no-store",
    }); */
    const data = await fetch(
      `${process.env.BASE_URL}api/product/category/${params.category}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const products = data.json();
    return products;
  }
  const { data } = await fetchProducts();
  console.log(data[0].category)
  return (
    <>
      <Categories />
      <h2 className="text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3">
      {data[0].category}
      </h2>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-2 md:gap-8 m-auto ">
          {data?.map((product, index) => {
            return (
              <>
                <div
                  key={index}
                  className="grid shadow bg-white dark:bg-accent grid-rows-2 md:grid-rows-none cursor-pointer rounded-xl w-[10.5rem] m-auto md:w-52 h-64 md:h-80 "
                >
                  <div className="relative h-36 ">
                    <Image
                      src={product.imageUrl}
                      layout="fill"
                      objectFit="contain"
                      alt="product"
                    />
                  </div>
                  <div className="p-1 md:p-2 grid grid-rows-2 md:grid-rows-1 mt-4 md:mt-0">
                    <div>
                      <h2 className="line-clamp-2 px-1 text-sm md:text-base font-mediums md:font-semibold">
                        {product.name}
                      </h2>
                    </div>
                    <div>
                      <p className="line-clamp-2 md:line-clamp-3 mt-1 md:mt-2 font-medium text-xs md:text-xs px-1 opacity-80">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center px-2 md:px-3 ">
                    <h3 className="text-base md:text-lg font-semibold">$154</h3>
                    <Button className="mb-3">Add</Button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}
