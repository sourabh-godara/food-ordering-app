import Image from "next/image";
import React from "react";

export default async function Categories() {
  async function fetchCategory() {
    "use server";
    const data = await fetch(`${process.env.BASE_URL}api/product/category`,{
      method: "GET",
      cache: 'no-store',
      next: { tags: ['category']}
    })
    const category = data.json();
    return category;
  }
  const { data } = await fetchCategory();
  return (
    <>
      <div className="flex flex-wrap gap-8 mt-10 p-4">
        {data.map((category, index) => {
          return (
            <div
              key={index}
              className="flex bg-white p-2 hover:scale-105 flex-col items-center transition-transform duration-500 rounded-xl gap-2 w-full sm:w-1/3 lg:w-1/6"
            >
              <div className="rounded-xl p-3">
                <Image
                  src={category.imageUrl}
                  width={80}
                  height={80}
                  objectFit="contain"
                  alt="burgers"
                />
              </div>
              <div className="text-sm flex flex-col leading-5 items-center gap-3">
                <div>
                  <div className="font-medium text-center line-clamp-3">
                    {category.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
