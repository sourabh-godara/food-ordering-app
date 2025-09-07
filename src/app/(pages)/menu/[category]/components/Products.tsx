import React from "react";
import ProductCards from "@/components/layout/ProductCards";
import { fetchProducts } from "@/app/actions/handleProducts";

interface ProductsProps {
  category: string;
}

export default async function Products({ category }: ProductsProps) {
  const { data, error } = await fetchProducts(category);
  if (error || data.length < 1) {
    return <p className="text-center mt-8 text-lg">No Products Found</p>;
  }
  return (
    <>
      <h2 className="text-lg font-medium md:text-2xl md:font-semibold mt-6 p-1 md:p-3">
        {category}
      </h2>
      {!data[0] && <h1 className="ml-4">No {category} right now!</h1>}
      <ProductCards products={data ? JSON.parse(JSON.stringify(data)) : []} />
    </>
  );
}
