"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Doctors from "@/components/sections/Doctors";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Sync state if skipped by session storage immediately
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("wb-loaded");
      if (hasLoaded === "true") {
        setPreloaderComplete(true);
      }
    }
  }, []);

  return (
    <>
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      
      {/* Master Wrapper: Fade-in page after preloader finishes */}
      <div
        className="transition-opacity duration-1000 ease-out"
        style={{ 
          opacity: preloaderComplete ? 1 : 0,
          pointerEvents: preloaderComplete ? "auto" : "none"
        }}
      >
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Process />
        <Doctors />
        <Gallery />
        <Testimonials />
        <Booking />
        <Faq />
        <Footer />
      </div>
    </>
  );
}
