"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

const statsData = [
  {
    endVal: 22,
    suffix: "",
    label: "Years Serving the Community",
    icon: (
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-teal/60 mb-4">
        {/* Motif: Tooth Outline */}
        <path
          d="M50 20C42 20 34 24 34 42C34 52 38 62 44 72C47 76 50 76 50 74C50 76 53 76 56 72C62 62 66 52 66 42C66 24 58 20 50 20Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    endVal: 30000,
    suffix: "+",
    label: "Smiles Treated & Restored",
    icon: (
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-teal/60 mb-4">
        {/* Motif: Smile Curve */}
        <path
          d="M20 45C30 65 70 65 80 45"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M16 45C16 45 20 40 22 45M84 45C84 45 80 40 78 45"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    endVal: 98,
    suffix: "%",
    label: "Patient Comfort Rating",
    icon: (
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-teal/60 mb-4">
        {/* Motif: Tooth + Sparkle */}
        <path
          d="M45 25C38 25 31 29 31 45C31 54 35 63 40 71C43 75 45 75 45 73C45 75 48 75 51 71C56 63 60 54 60 45C60 29 53 25 45 25Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M68 20L72 24L68 28L64 24Z"
          fill="currentColor"
        />
        <path
          d="M74 30L76 32L74 34L72 32Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    endVal: 9,
    suffix: "",
    label: "In-House Specialists",
    icon: (
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-teal/60 mb-4">
        {/* Motif: Dual Smile arcs */}
        <path
          d="M30 40C38 52 62 52 70 40"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M38 52C44 60 56 60 62 52"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      statsData.forEach((stat, idx) => {
        const valElement = container.querySelector(`.stat-val-${idx}`);
        if (!valElement) return;

        const countObj = { value: 0 };

        gsap.to(countObj, {
          value: stat.endVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valElement,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const formatted = Math.floor(countObj.value).toLocaleString();
            valElement.textContent = `${formatted}${stat.suffix}`;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative bg-off-white py-16 md:py-24 border-b border-brand-teal/5 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              {/* Stat Icon motif */}
              <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {stat.icon}
              </div>

              {/* Stat Numeral */}
              <div
                className={`stat-val-${idx} text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-accent-coral`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                0{stat.suffix}
              </div>

              {/* Stat Label */}
              <p className="text-xs uppercase tracking-widest text-brand-teal/70 font-sans font-semibold max-w-[160px] leading-relaxed pt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
