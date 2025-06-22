"use client"
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Boxes } from '@/components/ui/background-boxes'
import { Button } from '@/components/ui/button';
import ColourfulText from '@/components/ui/colourful-text'
import { cn } from '@/lib/utils'
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import React from 'react'

function Home() {
  const router = useRouter();
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <>

      <div className="h-auto relative w-full overflow-hidden bg-slate-800 flex flex-col items-center justify-center gap-6">
        <div className='flex mt-72 flex-col items-center justify-center'>
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
        <div className='mt-28 w-full'>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </>
  )
}

export default Home