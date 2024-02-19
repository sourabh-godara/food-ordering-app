import React from "react";
import HeroSection from "../../components/layout/HeroSection";
import BestSellers from "../../components/layout/BestSellers";
import HeroSectionTest from "./test/HeroSectionTest";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <div className='mt-2'>
        <HeroSectionTest />
      </div> */}
      <BestSellers />
    </main>
  );
}
