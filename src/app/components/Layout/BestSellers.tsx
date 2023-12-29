import Image from "next/image";
import React from "react";

export default async function BestSellers() {
  return (
    <>
      <h3 className="text-center font-bold text-4xl mt-8">Best Sellers</h3>
      <section className="flex gap-14 mt-10 justify-center">
        <div className="flex bg-gray-200 hover:scale-105 transition-transform duration-500 rounded-xl flex-col gap-1 h-72 w-52 p-4">
          <div className="relative h-full">
            <Image
              src={"/01.png"}
              layout="fill"
              objectFit="contain"
              alt="burgers"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div>
              <div className="font-semibold line-clamp-1">Veg. Burger</div>
              <div className="text-sm opacity-90 line-clamp-1">
                With Added Cream
              </div>
            </div>
            <button className="bg-primary hover:bg-red-600 text-white w-3/4 text-sm px-5 py-2 rounded-full">
              Add +
            </button>
          </div>
        </div>
        <div className="flex bg-gray-200 hover:scale-105 transition-transform duration-500 rounded-xl flex-col gap-1 h-72 w-52 p-4">
          <div className="relative h-full">
            <Image
              src={"/02.png"}
              layout="fill"
              objectFit="contain"
              alt="burgers"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div>
              <div className="font-semibold line-clamp-1">Veg. Burger</div>
              <div className="text-sm opacity-90 line-clamp-1">
                With Added Cream
              </div>
            </div>
            <button className="bg-primary hover:bg-red-600 text-white w-3/4 text-sm px-5 py-2 rounded-full">
              Add +
            </button>
          </div>
        </div>
        <div className="flex bg-gray-200 hover:scale-105 transition-transform duration-500 rounded-xl flex-col gap-1 h-72 w-52 p-4">
          <div className="relative h-full">
            <Image
              src={"/03.png"}
              layout="fill"
              objectFit="contain"
              alt="burgers"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div>
              <div className="font-semibold line-clamp-1">Veg. Burger</div>
              <div className="text-sm opacity-90 line-clamp-1">
                With Added Cream
              </div>
            </div>
            <button className="bg-primary hover:bg-red-600 text-white w-3/4 text-sm px-5 py-2 rounded-full">
              Add +
            </button>
          </div>
        </div>
        <div className="flex bg-gray-200 hover:scale-105 transition-transform duration-500 rounded-xl flex-col gap-1 h-72 w-52 p-4">
          <div className="relative h-full">
            <Image
              src={"/01.png"}
              layout="fill"
              objectFit="contain"
              alt="burgers"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div>
              <div className="font-semibold line-clamp-1">Veg. Burger</div>
              <div className="text-sm opacity-90 line-clamp-1">
                With Added Cream
              </div>
            </div>
            <button className="bg-primary hover:bg-red-600 text-white w-3/4 text-sm px-5 py-2 rounded-full">
              Add +
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
