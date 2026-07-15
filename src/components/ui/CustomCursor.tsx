"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  
  // Spring tracking coordinates for the trailing ring
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.45 };
  const springX = useSpring(ringX, springConfig);
  const springY = useSpring(ringY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Update trailing spring
      ringX.set(clientX);
      ringY.set(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor], input, select, textarea");
      if (interactive) {
        setHovered(true);
        const cursorVal = interactive.getAttribute("data-cursor");
        if (cursorVal === "gallery" || cursorVal === "view") {
          setCursorText(cursorVal === "gallery" ? "Smile" : "View");
        } else {
          setCursorText("");
        }
      } else {
        setHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny leading teal dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed pointer-events-none rounded-full bg-brand-teal z-[99999]"
        style={{
          width: hovered ? "6px" : "8px",
          height: hovered ? "6px" : "8px",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />
      {/* Trailing coral ring that morphs on hover */}
      <motion.div
        className="custom-cursor-ring fixed pointer-events-none z-[99998] border border-accent-coral flex items-center justify-center overflow-hidden"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          width: cursorText ? 82 : hovered ? 56 : 36,
          height: cursorText ? 30 : hovered ? 56 : 36,
          borderRadius: cursorText ? "15px" : "50%",
          backgroundColor: cursorText
            ? "#FF8B6B" // Solid Coral
            : hovered
            ? "rgba(15, 92, 86, 0.08)" // Translucent Teal
            : "transparent",
          borderColor: cursorText ? "transparent" : "#FF8B6B",
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#FAF9F6] leading-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
