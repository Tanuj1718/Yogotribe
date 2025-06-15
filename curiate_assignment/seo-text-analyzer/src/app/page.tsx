"use client"
import { Boxes } from '@/components/ui/background-boxes'
import { Button } from '@/components/ui/button';
import ColourfulText from '@/components/ui/colourful-text'
import { cn } from '@/lib/utils'
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import React from 'react'

function Home() {
  const router = useRouter();
  return (
    <>

      <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
      <motion.img
        src="https://portermetrics.com/wp-content/uploads/2024/10/Google-Ads-campaign-performance-report-Looker-Studio-1.png"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        Is your website <ColourfulText text="feeling" /> <br /> a little shy?
      </h1>
        <p className="text-center mt-2 text-neutral-300 relative z-20">
          Our SEO analyzer will help it step into the spotlight!
        </p>
        <Button
        className='mt-6 rounded-lg w-32 font-extrabold bg-black z-10'
        onClick={()=>{
          router.push('/main')
        }}
        >
          Get Started
        </Button>
      </div>
    </>
  )
}

export default Home