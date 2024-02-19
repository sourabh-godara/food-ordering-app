import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import connectDB from "@/lib/connectDB";
import { Product } from "@/app/api/models/productModel";

async function fetchProducts(newParam) {
  "use server";
  try {
    console.log(newParam);
    await connectDB();
    const res = await Product.find({ category: newParam });
    return { data: res, error: null };
  } catch (error) {
    console.log("Error fetching categories ", error);
    return { data: null, error: true };
  }
}
async function addToCart(formData: FormData) {
  "use server";
  const id = formData.get("productid");
  const product = await Product.findById(id);
  console.log(product);
}
async function ProductCard({ newParam }) {
  const { data, error } = await fetchProducts(newParam);
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-900'>
          Something went wrong!
        </h1>
      </div>
    );
  }
  return (
    <>
      <h2 className='text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3'>
        {data[0]?.category}
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-2 md:gap-8 m-auto '>
        {data?.map((product, index) => {
          return (
            <>
              <div
                key={product._id}
                className='grid shadow bg-white dark:bg-accent grid-rows-2 md:grid-rows-none cursor-pointer rounded-xl w-[10.5rem] m-auto md:w-52 h-64 md:h-80 '>
                <div className='relative h-36 '>
                  <Image
                    src={product.imageUrl}
                    layout='fill'
                    objectFit='contain'
                    alt='product'
                  />
                </div>
                <div className='p-1 md:p-2 grid grid-rows-2 md:grid-rows-1 mt-4 md:mt-0'>
                  <div>
                    <h2 className='line-clamp-2 px-1 text-sm md:text-base font-mediums md:font-semibold'>
                      {product.name}
                    </h2>
                  </div>
                  <div>
                    <p className='line-clamp-2 md:line-clamp-3 mt-1 md:mt-2 font-medium text-xs md:text-xs px-1 opacity-80'>
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className='w-full flex justify-between items-center px-2 md:px-3 '>
                  <h3 className='text-base md:text-lg font-semibold'>$154</h3>
                  <form action={addToCart}>
                    <Button
                      type='submit'
                      value={product._id}
                      name='productid'
                      className='mb-3'>
                      Add
                    </Button>
                  </form>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ProductCard;
