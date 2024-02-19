import React, { Suspense } from "react";
import Categories from "@/components/layout/Categories";
import Loading from "@/components/layout/Loading";
import ProductCard from "@/components/layout/ProductCard";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  let newParam = "whoop";
  return (
    <>
      <Categories />
      <Suspense fallback={<Loading />}>
        <ProductCard newParam={newParam} />
      </Suspense>
    </>
  );
}
