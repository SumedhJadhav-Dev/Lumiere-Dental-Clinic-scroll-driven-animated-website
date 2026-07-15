"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import "lenis/dist/lenis.css"; // Crucial: imports Lenis positional layout styles to allow scrolling

const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium heavy easing
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
};

// Child component inside ReactLenis context to safely access the useLenis hook
function LenisManager() {
  const lenis = useLenis(() => {
    // Sync GSAP ScrollTrigger updates on every scroll frame
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    // Direct Lenis RAF updates to go through GSAP's ticker loop
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateRaf);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={LENIS_OPTIONS}
      autoRaf={false} // disabled so GSAP ticker manages updates
    >
      <LenisManager />
      {children}
    </ReactLenis>
  );
}
