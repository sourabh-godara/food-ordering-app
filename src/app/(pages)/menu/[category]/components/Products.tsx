import React from "react";
import connectDB from "@/lib/connectDB";
import { Product } from "@/app/api/models/productModel";

import ProductCards from "@/components/layout/ProductCards";

async function fetchProducts(newParam) {
  "use server";
  try {
    await connectDB();
    const res = await Product.find({ category: newParam });
    return { data: res, error: null };
  } catch (error) {
    console.log("Error fetching categories ", error);
    return { data: null, error: true };
  }
}

export default async function Products({ newParam }) {
  const { data, error } = await fetchProducts(newParam);
  if (error) {
    throw new Error("Unable to fetch $Cart");
  }
  return (
    <>
      <h2 className='text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3'>
        {data[0]?.category}
      </h2>
      <ProductCards products={JSON.parse(JSON.stringify(data))} />
    </>
  );
}
