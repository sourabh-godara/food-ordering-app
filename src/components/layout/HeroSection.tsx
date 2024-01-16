import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-8">
      <section>
        <div className="text-5xl md:text-7xl ">
          <h2 className="leading-snug tracking-wide p-6 font-bold">
            It&apos;s not just
            <br /> food, it&apos;s an
            <br />
            experience
          </h2>
        </div>
        <div className="flex gap-5 mt-4 ml-4 w-fit text-sm">
          <Button>View Menu</Button>
          <Button variant="outline">Book A Table</Button>
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
