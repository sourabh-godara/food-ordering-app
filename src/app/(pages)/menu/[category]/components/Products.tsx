import React from "react";
import connectDB from "@/lib/connectDB";
import { Product } from "@/app/api/models/productModel";
import ProductCards from "@/components/layout/ProductCards";

// Define types for the function parameters and return values
interface FetchProductsResult {
  data: Product[] | null;
  error: boolean | null;
}

// Define the Product type (assuming Mongoose schema)
interface Price {
  size: string;
  price: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  prices: Price[];
  imageUrl?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchProducts(newParam: string): Promise<FetchProductsResult> {
  "use server";
  try {
    await connectDB();
    const res = await Product.find({ category: newParam });
    return { data: res, error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: null, error: true };
  }
}

interface ProductsProps {
  newParam: string;
}

export default async function Products({ newParam }: ProductsProps) {
  const { data, error } = await fetchProducts(newParam);

  if (error) {
    throw new Error("Unable to fetch products");
  }

  return (
    <>
      <h2 className='text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3'>
        {data?.[0]?.category || "Products"}
      </h2>
      <ProductCards products={data ? JSON.parse(JSON.stringify(data)) : []} />
    </>
  );
}
