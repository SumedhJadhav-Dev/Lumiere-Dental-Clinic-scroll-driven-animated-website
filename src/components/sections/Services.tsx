"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const services = [
  {
    num: "01",
    title: "General Dentistry",
    desc: "Comprehensive checkups, gentle hygienist cleanings, and preventative care designed for all ages.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
  },
  {
    num: "02",
    title: "Cosmetic & Veneers",
    desc: "Custom porcelain veneers and tooth recontouring designed to sculpt natural symmetry and balance.",
    img: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=800",
  },
  {
    num: "03",
    title: "Invisalign® Invisalign",
    desc: "Clear aligner therapies that comfortably align teeth without clinical brackets or metallic wires.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
  },
  {
    num: "04",
    title: "Dental Implants",
    desc: "Advanced bio-compatible implants replacing missing teeth with durable, natural-feeling crowns.",
    img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800",
  },
  {
    num: "05",
    title: "Teeth Whitening",
    desc: "Laser-activated clinical treatments designed to lift deep stains safely in a single appointment.",
    img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800",
  },
  {
    num: "06",
    title: "Little Smiles Care",
    desc: "Sensory-friendly checkups and developmental therapies engineered for early childhood confidence.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
  },
  {
    num: "07",
    title: "Emergency Care",
    desc: "Same-day emergency pain relief, cracked crown repair, and urgent extractions when you need it most.",
    img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rail = railRef.current;
    if (!container || !rail) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only pin and horizontal scroll-jack on desktop (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const railWidth = rail.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(railWidth - viewportWidth + 96); // offset padding
        };

        const scrollTween = gsap.to(rail, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.0,
            start: "top top",
            end: () => `+=${rail.scrollWidth - window.innerWidth + 200}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                gsap.set(progressBarRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      });
    });

    return () => ctx.revert();
  }, []);

  const handleBookingScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative bg-secondary-mint/30 w-full overflow-hidden select-none py-24 md:py-32"
    >
      {/* Title block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 relative">
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Dental Excellence
            </span>
          </div>
          <h2 className="block">
            <SplitText
              text="Our Treatment Suite"
              className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-teal tracking-tight"
              wordClassName="font-bold"
              scrub={true}
            />
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-brand-teal/80 font-sans font-light leading-relaxed">
          From micro-preventative cleanings to dental restorations, our board specialists utilize modern diagnostics to cultivate your natural, healthy smile.
        </p>
      </div>

      {/* Desktop Horizontal Scroll Rail */}
      <div className="hidden md:block relative pl-12 md:pl-24 pb-12 z-10">
        <div
          ref={railRef}
          className="flex gap-8 w-max pr-24"
          style={{ willChange: "transform" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative w-[370px] h-[520px] rounded-[2.5rem] border border-brand-teal/10 bg-[#FAF9F6] p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:border-brand-teal/20 cursor-pointer"
            >
              {/* Card top: Rounded Image */}
              <div className="relative w-full h-[260px] rounded-t-[1.8rem] overflow-hidden bg-secondary-mint">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </div>

              {/* Card bottom: Details */}
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-accent-coral font-serif italic text-lg font-bold">
                    {service.num}
                  </span>
                  <Sparkles size={12} className="text-brand-teal/20" />
                </div>
                <h3 className="text-xl font-serif text-brand-teal font-bold tracking-wide">
                  {service.title}
                </h3>
                <p className="text-brand-teal/70 font-sans font-light text-xs leading-relaxed max-w-sm">
                  {service.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-accent-coral font-bold group-hover:text-brand-teal transition-colors">
                  <a href="#booking" onClick={handleBookingScroll}>Learn more &rarr;</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
          <div className="w-full h-[3px] bg-brand-teal/10 relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-accent-coral w-full origin-left scale-x-0 rounded-full"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>

      {/* Mobile swipeable carousel layout */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 w-full scrollbar-none z-10 relative">
        {services.map((service, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[82vw] h-[460px] rounded-[2rem] border border-brand-teal/10 bg-[#FAF9F6] p-5 flex flex-col justify-between"
          >
            {/* Card Top: Rounded Image */}
            <div className="relative w-full h-[220px] rounded-t-[1.5rem] overflow-hidden bg-secondary-mint">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover filter brightness-95 pointer-events-none"
              />
            </div>

            {/* Card Bottom: details */}
            <div className="space-y-2.5 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-accent-coral font-serif italic text-base font-bold">
                  {service.num}
                </span>
              </div>
              <h3 className="text-lg font-serif text-brand-teal font-bold">
                {service.title}
              </h3>
              <p className="text-brand-teal/70 font-sans font-light text-[11px] leading-relaxed">
                {service.desc}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-accent-coral font-bold">
                <a href="#booking" onClick={handleBookingScroll}>Learn more &rarr;</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
