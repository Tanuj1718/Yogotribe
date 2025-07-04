"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

export function SidebarDemo() {
  const links = [
    {
      label: "SEO Tool",
      href: "/main",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        " flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-full",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Shraddha K",
                href: "#",
                icon: (
                  <img
                    src="https://t3.gstatic.com/images?q=tbn:ANd9GcRFwQcvntDypuiAjCT5vbXp8lBNdhbylkR_DRFqamaEG_vOjvF2"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
              <Home/>
      </Sidebar>

    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img className="size-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPlbD42KHzVMn8SG2t54umtxYfOz2Mcwm8w&s" alt="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        SEO Labs
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img className="size-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPlbD42KHzVMn8SG2t54umtxYfOz2Mcwm8w&s" alt="" />
    </a>
  );
};


import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { Boxes } from '@/components/ui/background-boxes'
import { Button } from '@/components/ui/button';
import ColourfulText from '@/components/ui/colourful-text'
import { useRouter } from 'next/navigation';


const Home = ()=> {
  const router = useRouter();
  const testimonials = [
    {
      quote:
        "I’m a developer, which means I break out in hives if I see anything with a 'marketing' label. But your SEO analyzer? It’s like the VS Code of SEO—clean, smart, and it doesn’t ask me to read a 40-page eBook first. I actually enjoyed optimizing my site. What is happening to me?",
      name: "Nikhil V.",
      designation: "Founder of CodeCurry",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I used to think SEO stood for 'Seriously Enraging Operations.' But this tool changed that. Now I can actually find keywords faster than I can find my socks in the morning. My site's traffic doubled in 3 weeks. My chai blog is finally reaching more than just my mom!",
      name: "Anjali M.",
      designation: "Digital Marketer at ChaiChaska.in",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I had no idea what I was doing when they told me to 'run an SEO audit.' I thought they meant a literal audit. Your tool saved me from Googling 'what is H1 and why does it hate me?' My boss thinks I’m a genius now. I'm not correcting him.",
      name: "Dijkstra P.",
      designation: "Intern at ClickSpree Agency",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I’ve used every tool under the sun, from the free ones to those that require sacrificing a goat and your wallet. Yours? Fast, accurate, clean UI, and doesn’t make me cry inside. I use it on client sites, my own projects, and sometimes just for fun. Don’t judge me.",
      name: "James Kim",
      designation: "SEO Consultant",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Running a business, I barely have time to eat lunch, let alone learn about meta tags and backlinks. Your tool gave me a full SEO report in less time than it takes my cat to knock something off the shelf. And yes, I'm ranking better now—and so is the cat, on Instagram.",
      name: "Nikita P.",
      designation: "Owner of PetPurrfection Groomers",
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
