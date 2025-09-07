import Link from "next/link";
import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { fetchCategories } from "@/app/actions/handleCategories";
import Categories from "./Categories";

export default async function BestSellers() {
  const { data, error } = await fetchCategories();
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Something went wrong!
        </h1>
      </div>
    );
  }
  return (
    <>
      <h3 className="text-center font-bold text-4xl mt-8">Menu</h3>
      {data.length < 1 ? (
        <p className="text-center mt-10 text-gray-700">
          Food Basket is Empty :(
        </p>
      ) : (
        <section className="flex w-full justify-center items-center">
          <Categories categories={data} />

          <Link href={`/menu/all`}>
            <IoArrowForwardOutline
              className="bg-gray-300 mt-4 rounded-full p-2"
              size={40}
            />
          </Link>
        </section>
      )}
    </>
  );
}
