"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/animations";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [showPreloader, setShowPreloader] = useState(true);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already loaded the site in this session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("wb-loaded");
      if (hasLoaded === "true") {
        setShowPreloader(false);
        onComplete();
        return;
      }
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("wb-loaded", "true");
          }
          // Slide open split panels
          gsap.timeline({
            onComplete: () => {
              setShowPreloader(false);
              onComplete();
            },
          })
            .to(leftPanelRef.current, {
              xPercent: -100,
              duration: 1.1,
              ease: "power3.inOut",
            })
            .to(
              rightPanelRef.current,
              {
                xPercent: 100,
                duration: 1.1,
                ease: "power3.inOut",
              },
              0
            );
        },
      });

      // 1. Sketch in the SVG tooth outline
      tl.fromTo(
        svgPathRef.current,
        { strokeDashoffset: 350 },
        { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }
      );

      // 2. Stagger text brand reveal
      tl.fromTo(
        logoTextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );

      // 3. Fade out center logo elements before split wipe
      tl.to(
        [logoTextRef.current, svgPathRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.in",
          delay: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!showPreloader) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex pointer-events-none select-none">
      {/* Left panel split */}
      <div
        ref={leftPanelRef}
        className="w-1/2 h-full bg-[#FAF9F6] border-r border-brand-teal/5 pointer-events-auto"
        style={{ willChange: "transform" }}
      />
      {/* Right panel split */}
      <div
        ref={rightPanelRef}
        className="w-1/2 h-full bg-[#FAF9F6] border-l border-brand-teal/5 pointer-events-auto"
        style={{ willChange: "transform" }}
      />

      {/* Center Logo Group */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <svg
          width="90"
          height="90"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Custom SVG Tooth sketch line path */}
          <path
            ref={svgPathRef}
            d="M50 18C42 18 32 23 32 44C32 54 36 65 43 75C47 80 50 80 50 78C50 80 53 80 57 75C64 65 68 54 68 44C68 23 58 18 50 18Z"
            stroke="#0F5C56"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="350"
            strokeDashoffset="350"
            style={{ willChange: "stroke-dashoffset" }}
          />
        </svg>
        <div
          ref={logoTextRef}
          className="mt-6 text-center font-serif text-brand-teal italic text-2xl md:text-3xl font-semibold tracking-tight"
        >
          Willow & Bright
          <div className="text-[10px] tracking-[0.25em] font-sans font-medium uppercase text-accent-coral mt-2">
            Dental Studio
          </div>
        </div>
      </div>
    </div>
  );
}
