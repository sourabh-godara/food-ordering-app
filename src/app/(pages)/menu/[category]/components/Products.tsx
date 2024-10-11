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

async function fetchProducts(category: string): Promise<FetchProductsResult> {
  "use server";
  try {
    await connectDB();
    const res = await Product.find({ category: category });
    return { data: res, error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: null, error: true };
  }
}

interface ProductsProps {
  category: string;
}

export default async function Products({ category }: ProductsProps) {
  const { data, error } = await fetchProducts(category);
  if (error) {
    throw new Error("Unable to fetch products");
  }

  return (
    <>
      <h2 className='text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3'>
        {category}
      </h2>
      {!data[0] && <h1 className="ml-4">No {category} right now!</h1>}
      <ProductCards products={data ? JSON.parse(JSON.stringify(data)) : []} />
    </>
  );
}
