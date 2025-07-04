"use client"
import { SidebarDemo } from '@/components/sidebar';
import { useRouter } from 'next/navigation';
import React from 'react'

function Home() {
  const router = useRouter();
  
  return (
    <>
    <div className='h-full'>
    <SidebarDemo/>
    </div>
    </>
  )
}

export default Home