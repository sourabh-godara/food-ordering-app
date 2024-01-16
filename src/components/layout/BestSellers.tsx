import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

export default async function BestSellers() {
  async function fetchCategory() {
    "use server";
    const data = await fetch(`${process.env.BASE_URL}api/product/category`, {
      method: "GET",
    });
    const category = data.json();
    return category;
  }
  const { data } = await fetchCategory();
  return (
    <>
      <h3 className="text-center font-bold text-4xl mt-8">Menu</h3>
      <section className="flex gap-14 mt-10 justify-center">
        <div className="flex flex-wrap gap-12">
          {data
            .filter((items, index) => index < 5)
            .map((category) => {
              return (
                <>
                  <div className="flex cursor-pointer shadow items-center  rounded-xl flex-col gap-2 h-44 w-36 ">
                    <div className="bg-accent rounded-xl p-3">
                      <Image
                        src={category.imageUrl}
                        width={100}
                        height={100}
                        objectFit="contain"
                        alt="burgers"
                      />
                    </div>
                    <div className=" text-sm flex flex-col leading-5 items-center gap-3">
                      <div>
                        <div className="font-medium text-center line-clamp-3">
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="m-auto cursor-pointer hover:scale-105 transition-transform duration-500 bg-accent rounded-full p-2">
              <div>
              <Link href={"/menu"}>
                <IoArrowForwardOutline size={26} />
                </Link>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
