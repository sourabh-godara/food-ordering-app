import React, { Suspense } from "react";
import Categories from "@/components/layout/Categories";
import Loading from "@/components/layout/Loading";
import Products from "@/app/(pages)/menu/[category]/components/Products";
import { fetchCategories } from "@/app/actions/handleCategories";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  let category = decodeURI((await params).category);

  const { data, error } = await fetchCategories();

  if (category == "all") {
    category = data[0].name;
  }

  if (error || data.length < 1) {
    return <p className="text-center mt-8 text-lg">No Categories Found</p>;
  }
  return (
    <>
      <Categories categories={data} />
      <Suspense fallback={<Loading />}>
        <Products category={category} />
      </Suspense>
    </>
  );
}
