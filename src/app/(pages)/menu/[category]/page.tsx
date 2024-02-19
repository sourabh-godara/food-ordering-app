import React, { Suspense } from "react";
import Categories from "@/components/layout/Categories";
import Loading from "@/components/layout/Loading";
import ProductCard from "@/components/layout/ProductCard";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  let newParam = params.category
    .replace("%20", " ")
    .replace("%20", " ")
    .replace("%26%20", "& ");
  return (
    <>
      <Categories />
      <Suspense fallback={<Loading />}>
        <ProductCard newParam={newParam} />
      </Suspense>
    </>
  );
}
