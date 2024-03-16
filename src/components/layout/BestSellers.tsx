import { Category } from "@/app/api/models/categoryModel";
import connectDB from "@/lib/connectDB";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

async function fetchCategories() {
  "use server";
  try {
    await connectDB();
    const res = await Category.find();
    return { data: res, error: null };
  } catch (error) {
    console.log("Error fetching categories ", error);
    return { data: null, error: true };
  }
}
export default async function BestSellers() {
  const { data, error } = await fetchCategories();
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-900'>
          Something went wrong!
        </h1>
      </div>
    );
  }
  return (
    <>
      <h3 className='text-center font-bold text-4xl mt-8'>Menu</h3>
      <section className='flex gap-14 w-full mt-10 justify-center'>
        <div className='grid grid-flow-col gap-4 overflow-scroll md:overflow-auto '>
          {data
            .filter((items, index) => index < 5)
            .map((category) => {
              return (
                <div key={category._id}>
                  <div className='flex cursor-pointer shadow items-center  rounded-xl flex-col gap-2 h-44 w-36 '>
                    <div className='bg-accent rounded-xl p-3'>
                      <Image
                        src={category.imageUrl}
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                        alt='burgers'
                      />
                    </div>
                    <div className=' text-sm flex flex-col leading-5 items-center gap-3'>
                      <div>
                        <div className='font-medium text-center line-clamp-3'>
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className='h-full w-28 bg-gradient-to-l from-background via-background/80 to-transparent relative right-28 flex'>
            <div className=' mt-11 ml-20 m-auto shadow-lg cursor-pointer hover:scale-105 transition-transform duration-500 rounded-full'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='bg-accent hover:bg-accent/90 rounded-full p-2'>
                      <Link href={`/menu/${data[0].name}`}>
                        <IoArrowForwardOutline size={26} />
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='bg-accent'>
                    Explore Menu
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
