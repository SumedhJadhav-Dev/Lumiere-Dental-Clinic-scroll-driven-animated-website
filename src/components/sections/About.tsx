"use client";

import { useEffect, useRef } from "react";
import { Sparkles, ShieldCheck, HeartPulse } from "lucide-react";
import { gsap } from "@/lib/animations";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    const img = imageRef.current;
    if (!section || !mask || !img) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop pinned morphing reveal
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        // Morph clip-path from soft organic blob to full rounded rect
        tl.fromTo(
          mask,
          { clipPath: "inset(12% 22% 12% 22% round 140px)" },
          { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none" }
        );

        // Subtly scale down inner image to add visual parallax depth
        tl.fromTo(
          img,
          { scale: 1.25 },
          { scale: 1.0, ease: "none" },
          0
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-off-white w-full select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 relative">
          
          {/* Left Column: Pinned Image Wrapper */}
          <div className="md:w-1/2 md:h-screen md:sticky md:top-0 flex items-center py-12 md:py-0 z-10">
            <div
              ref={maskRef}
              className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] shadow-md overflow-hidden bg-secondary-mint"
              style={{
                willChange: "clip-path",
                clipPath: "inset(0% 0% 0% 0% round 32px)", // default mobile round corners
              }}
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1200"
                alt="Friendly Dental Checkup Setup"
                className="w-full h-full object-cover pointer-events-none filter brightness-95"
              />
            </div>
          </div>

          {/* Right Column: Stacked Text Blocks (Scrollable) */}
          <div className="md:w-1/2 py-12 md:py-[24vh] space-y-[24vh] md:space-y-[35vh]">
            
            {/* Block 1: Intro / Comfort-First */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent-coral/20 bg-accent-coral/5 rounded-full text-brand-teal">
                <HeartPulse size={14} className="text-accent-coral" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
                  Philosophy
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-teal leading-tight">
                Comfort-First Dentistry
              </h2>
              <p className="text-sm md:text-base text-brand-teal/80 font-sans font-light leading-relaxed">
                We believe a dental visit can actually be relaxing. Our treatment suites feature soft blankets, noise-canceling headphones, and a staff that listens patiently without judgement. Your comfort guides every single procedure we perform.
              </p>
            </div>

            {/* Block 2: Modern Technology */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full text-brand-teal">
                <Sparkles size={14} className="text-accent-coral" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
                  Technology
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-teal leading-tight">
                Mess-Free Digital Scans
              </h2>
              <p className="text-sm md:text-base text-brand-teal/80 font-sans font-light leading-relaxed">
                Say goodbye to sticky paste dental impressions. Our 3D intraoral scanners capture a micrometer-accurate model of your teeth in under two minutes, saving you time and ensuring restorations fit perfectly the first time.
              </p>
            </div>

            {/* Block 3: Anxiety Care */}
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full text-brand-teal">
                <ShieldCheck size={14} className="text-accent-coral" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
                  Care
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-teal leading-tight">
                Gentle Support for Anxious Patients
              </h2>
              <p className="text-sm md:text-base text-brand-teal/80 font-sans font-light leading-relaxed">
                Dental anxiety is real, and we meet it with empathy. From warm clinical explanations to soothing laser treatments that replace loud drills, we tailor dental visits to protect your nervous system and support your peace of mind.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
