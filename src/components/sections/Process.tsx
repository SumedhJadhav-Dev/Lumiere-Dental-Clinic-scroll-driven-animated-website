"use client";

import { useEffect, useRef } from "react";
import { Calendar, Coffee, ClipboardCopy, Sparkles } from "lucide-react";
import { gsap } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const steps = [
  {
    icon: <Calendar size={20} />,
    title: "1. Easy Online Booking",
    desc: "Reserve a custom slot on our real-time calendar in under two minutes. Select your preferred treatments and insurance options from home.",
  },
  {
    icon: <Coffee size={20} />,
    title: "2. Comfort Consultation",
    desc: "Unwind in our cozy waiting lounge with herbal tea. We discuss your dental history, personal smile aspirations, and any clinical anxiety.",
  },
  {
    icon: <ClipboardCopy size={20} />,
    title: "3. Personalized Smile Map",
    desc: "Examine a high-resolution 3D simulation of your dental structure. Together, we design a treatment plan aligned with your budget and goals.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "4. Ongoing Smile Care",
    desc: "Walk out with a clear path forward, direct care packages, and a routine scaling schedule to maintain your healthy, radiant smile.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const ctx = gsap.context(() => {
      // 1. Draw central SVG line on scroll (using pathLength="1" trick)
      gsap.fromTo(
        path,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 45%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      // 2. Animate step badges popping into scale as scroll reaches them
      const stepItems = container.querySelectorAll(".timeline-step");
      stepItems.forEach((item) => {
        const badge = item.querySelector(".step-badge");
        const card = item.querySelector(".step-card");

        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })
          .fromTo(
            badge,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.8)" }
          )
          .fromTo(
            card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden select-none border-b border-brand-teal/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="mb-20 text-center max-w-xl mx-auto">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Your Journey
            </span>
          </div>
          <h2 className="block mb-4">
            <SplitText
              text="Your Visit, Step by Step"
              className="text-3xl md:text-5xl font-serif font-bold text-brand-teal tracking-tight"
              wordClassName="font-bold"
            />
          </h2>
          <p className="text-sm text-brand-teal/70 font-sans font-light">
            We guide you through a comfortable, transparent dental experience tailored completely to your pace.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central SVG Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-12 w-4 pointer-events-none">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
              {/* Backing line */}
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="100%"
                stroke="rgba(15, 92, 86, 0.08)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Animated drawing path */}
              <line
                ref={pathRef}
                x1="8"
                y1="0"
                x2="8"
                y2="100%"
                stroke="#FF8B6B"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset="1"
                pathLength="1"
                style={{ willChange: "stroke-dashoffset" }}
              />
            </svg>
          </div>

          {/* Steps List */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="timeline-step flex flex-col md:flex-row items-start md:items-center relative w-full"
                >
                  
                  {/* Left placeholder or Content Card (for desktop alternating) */}
                  <div className={`w-full md:w-1/2 pr-0 md:pr-12 pl-16 md:pl-0 ${isEven ? "md:text-right" : "md:order-last md:text-left"}`}>
                    <div className="step-card bg-secondary-mint/20 border border-brand-teal/5 p-6 rounded-3xl shadow-sm hover:border-brand-teal/10 transition-colors">
                      <h3 className="text-lg md:text-xl font-serif text-brand-teal font-bold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-brand-teal/80 font-sans font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="step-badge absolute left-3 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-teal text-[#FAF9F6] flex items-center justify-center shadow-md z-10 border-2 border-[#FAF9F6]">
                    {step.icon}
                  </div>

                  {/* Empty side spacer for desktop layout symmetry */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
