"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Body from '@/components/Body'
import About from '@/components/About'
import Project from '@/components/Project'
// import Resume from '@/components/Resume'
import Contact from "@/components/Contact"
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Experience from '@/components/Experience'
import Certificate from '@/components/Certificate'
import Loader from '@/components/Loader'

const page = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')

    if (!revealItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-700'}>
        <Navbar/>
        <div className="reveal"><Body /></div>
        <div className="reveal"><About /></div>
        <div className="reveal"><Experience/></div>
        <div className="reveal"><Project /></div>
        <div className="reveal"><Certificate/></div>
        {/* <Resume /> */}
        <div className="reveal"><Contact /></div>
        <div className="reveal"><Footer /></div>
      </div>
      <Toaster position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 9000,
          removeDelay: 3000,
          style: {

          },

          // Default options for specific types
          success: {
            duration: 5000,
            iconTheme: {
              primary: '',
              secondary: 'black',
            },
          },
        }} />

    </>
  )
}

export default page