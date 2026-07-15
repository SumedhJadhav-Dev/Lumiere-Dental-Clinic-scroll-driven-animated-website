"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  scrub?: boolean;
}

export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  scrub = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const words = element.querySelectorAll(".split-word-inner");
    if (words.length === 0) return;

    // Reset properties with a friendly rotational tilt
    gsap.set(words, { yPercent: 100, opacity: 0, rotate: 4 });

    let tl: gsap.core.Timeline | gsap.core.Tween;

    if (scrub) {
      // Scrub reveal tied directly to scrollbar
      tl = gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1.2,
        },
      });
    } else {
      // One-shot staggered reveal on entering viewport
      tl = gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.04,
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [text, delay, scrub]);

  const wordsArray = text.split(" ");

  return (
    <span ref={containerRef} className={`${className} inline-flex flex-wrap`}>
      {wordsArray.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden py-[0.08em] mr-[0.24em] select-none"
        >
          <span
            className={`inline-block split-word-inner origin-bottom-left ${wordClassName}`}
            style={{ display: "inline-block" }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
