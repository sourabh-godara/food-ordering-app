import Image from 'next/image'
import React from 'react'
import HeroSection from '../../components/layout/HeroSection'
import BestSellers from '../../components/layout/BestSellers'

export default function Home() {
  
  return (
    <main>
    <HeroSection />
    <BestSellers />
    
  </main>
  )
}
