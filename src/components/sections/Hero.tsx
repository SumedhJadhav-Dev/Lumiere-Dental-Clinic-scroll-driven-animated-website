"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import { gsap } from "@/lib/animations";
import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow parallax drift of the image inside its frame
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Framed image mask entrance animation
      gsap.fromTo(
        imageFrameRef.current,
        { scale: 0.94, clipPath: "inset(8% 8% 8% 8% round 40px)", opacity: 0 },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          delay: 0.5,
        }
      );

      // 3. Stagger reveal content elements
      const tl = gsap.timeline({ delay: 0.7 });
      const fadeElements = contentRef.current?.querySelectorAll(".hero-fade-in");
      if (fadeElements && fadeElements.length > 0) {
        tl.fromTo(
          fadeElements,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power4.out", stagger: 0.15 }
        );
      }

      // 4. Slide in floating Google rating card
      if (floatingCardRef.current) {
        tl.fromTo(
          floatingCardRef.current,
          { x: 30, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }

      // 5. Fade in bottom scroll cue
      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleBookScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-off-white flex flex-col justify-between pt-32 pb-10 px-6 md:px-16 lg:px-24 select-none overflow-hidden"
    >
      {/* Background drifting blobs for depth */}
      <div className="float-blob-teal top-1/4 -left-20" />
      <div className="float-blob-coral bottom-1/4 -right-16" />

      {/* Grid Content */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Column: Headline and CTAs (7 cols) */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center space-y-8 md:space-y-10">
          
          {/* Welcome Tag */}
          <div className="hero-fade-in inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Willow & Bright Dental Studio
            </span>
          </div>

          {/* Headline - Rotational Split Text */}
          <h1 className="block">
            <SplitText
              text="Dentistry That Feels Like Coming Home"
              className="text-4xl sm:text-6xl lg:text-[4.6vw] font-serif font-bold text-brand-teal leading-[1.1] tracking-tight"
              wordClassName="font-bold split-word"
              scrub={true}
            />
          </h1>

          {/* Subline */}
          <p className="hero-fade-in text-sm md:text-base lg:text-lg text-brand-teal/80 font-sans font-light leading-relaxed max-w-xl">
            Experience gentle, comfort-first dental care in a space designed to feel like home. We prioritize dental health and your confidence, making appointments peaceful and restorative.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-fade-in flex flex-wrap gap-4 items-center">
            {/* Primary Coral Wipe Button */}
            <Magnetic strength={0.18}>
              <a
                href="#booking"
                onClick={handleBookScroll}
                className="btn-coral-wipe inline-flex items-center gap-2.5 px-8 py-4 bg-brand-teal text-[#FAF9F6] border border-brand-teal font-sans text-xs uppercase tracking-widest font-semibold rounded-full group cursor-pointer hover:border-accent-coral"
              >
                Book Your Visit
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-[#FAF9F6]" />
              </a>
            </Magnetic>

            {/* Secondary Outline Tour Button */}
            <Magnetic strength={0.12}>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-brand-teal/20 text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-full group cursor-pointer"
              >
                <Play size={12} className="fill-brand-teal text-brand-teal group-hover:scale-110 transition-transform" />
                Explore Services
              </a>
            </Magnetic>
          </div>
          
        </div>

        {/* Right Column: Parallax Portrait Frame (5 cols) */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end select-none relative">
          
          {/* Main Rounded Image Container */}
          <div
            ref={imageFrameRef}
            className="relative w-full sm:w-[440px] lg:w-full h-[450px] lg:h-[550px] shadow-lg overflow-hidden"
            style={{
              willChange: "clip-path, transform, opacity",
              borderRadius: "32px",
            }}
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200"
              alt="Willow & Bright Clinic Interior"
              className="w-full h-[120%] object-cover absolute -top-[10%] left-0 scale-105 pointer-events-none filter brightness-95"
            />
            {/* Soft Ambient Color Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Google Rating Card */}
          <div
            ref={floatingCardRef}
            className="absolute -bottom-4 -left-4 sm:left-4 bg-[#FAF9F6] border border-brand-teal/10 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-10 h-10 rounded-full bg-secondary-mint flex items-center justify-center text-brand-teal">
              <Star size={18} className="fill-accent-coral text-accent-coral" />
            </div>
            <div className="font-sans text-left">
              <div className="text-xs font-bold text-brand-teal flex items-center gap-1">
                ⭐ 4.9 <span className="text-[10px] text-brand-teal/60 font-medium">(2,300+)</span>
              </div>
              <div className="text-[9px] uppercase tracking-wider text-brand-teal/50 font-semibold">
                Google Reviews Rating
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div
        ref={scrollCueRef}
        className="flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-brand-teal/40 pt-10 font-sans z-10"
      >
        <span>Gentle Dentistry / Aesthetics</span>
        <div
          className="flex items-center gap-2 hover:text-accent-coral transition-colors duration-300 cursor-pointer group"
          onClick={() => {
            document.querySelector("#marquee")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll to explore</span>
          <span className="inline-block animate-bounce group-hover:text-accent-coral text-brand-teal">↓</span>
        </div>
      </div>
    </section>
  );
}
