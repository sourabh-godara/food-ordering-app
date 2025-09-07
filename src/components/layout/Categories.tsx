import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories({ categories }) {
  return (
    <>
      <div className="grid grid-flow-col gap-6 justify-start overflow-x-auto overflow-y-hidden md:overflow-auto mt-10 p-2 md:p-4">
        {categories.map((category) => {
          return (
            <Link
              href={`/menu/${category.name}`}
              key={category._id}
              className="flex dark:bg-accent hover:bg-accent/90 transition-all duration-150 p-2 flex-col items-center rounded-xl gap-2 w-28 md:w-40"
            >
              <div className="rounded-xl p-3">
                <Image
                  src={category.imageUrl}
                  width={110}
                  height={110}
                  objectFit="contain"
                  alt={category.name}
                  className="rounded-full"
                />
              </div>
              <div className="font-medium text-xs md:text-sm text-center line-clamp-3">
                {category.name}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
