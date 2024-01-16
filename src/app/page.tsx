import Image from 'next/image'
import React from 'react'
import HeroSection from '../components/layout/HeroSection'
import BestSellers from '../components/layout/BestSellers'

export default function Home() {
  
  return (
    <main>
    <HeroSection />
    <BestSellers />
    <div className="w-11/12 m-auto grid grid-cols-2 bg-accent mt-10 p-7 rounded-2xl">
      <div className="flex flex-col gap-6">
        <span className="text-2xl">Special Offer!</span>
        <h2 className="font-bold text-4xl">
          GOOD FOOD, DRINKS &<br />
          GREAT COMPANY
        </h2>
        <h3 className="opacity-80">Offer available for limited time only</h3>
      </div>
      <div className="relative">
        <div className="h-48 w-56 relative left-32 rounded-full rounded-b-none rounded-br-none bg-red-700 opacity-90"></div>
        <Image
          src={"/01.png"}
          layout="fill"
          objectFit="contain"
          alt="burgers"
        />
      </div>
    </div>
  </main>
  )
}
