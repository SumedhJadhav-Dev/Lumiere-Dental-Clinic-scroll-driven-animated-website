"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0.1 to 0.9 depending on how heavy the attraction should be
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jerky movements
  const springConfig = { damping: 15, stiffness: 140, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Disable magnetic button on mobile/touch screens
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distX = clientX - centerX;
      const distY = clientY - centerY;
      
      const distance = Math.hypot(distX, distY);
      const activeRadius = 80; // Distance in pixels to trigger pull

      if (distance < activeRadius) {
        setIsHovered(true);
        // Magnetic pull is stronger closer to center
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block"
      data-cursor="magnetic"
    >
      {children}
    </motion.div>
  );
}
