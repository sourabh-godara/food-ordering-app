import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-14">
      <section>
        <div className="text-5xl md:text-7xl ">
          <h2 className="leading-snug tracking-wide p-6 font-bold">
            It&apos;s not just
            <br /> food, it&apos;s an
            <br />
            experience
          </h2>
        </div>
        <div className="flex gap-5 p-5 text-sm">
          <button className="bg-primary px-6 py-2 text-white rounded-full">
            View Menu
          </button>
          <button className="bg-gray-200 px-5 py-2.5 rounded-full">Book A Table</button>
        </div>
      </section>

      <section className="hidden md:inline">
        <div className="w-full h-full relative">
          <Image
            src={"/Burger.png"}
            alt="burger"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </section>
    </div>
  );
}
