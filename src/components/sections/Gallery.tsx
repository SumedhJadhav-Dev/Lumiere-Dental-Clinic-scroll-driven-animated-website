"use client";

import { useEffect, useRef, useState } from "react";
import { X, MoveHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/animations";
import SplitText from "@/components/ui/SplitText";

const transformations = [
  {
    title: "Porcelain Veneers Design",
    type: "Cosmetic Makeover",
    tag: "6 Veneers",
    beforeImg: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
  },
  {
    title: "Invisalign® Alignment",
    type: "Clear Orthodontics",
    tag: "12 Months",
    beforeImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
  },
  {
    title: "Aesthetic Whitening",
    type: "Laser Teeth Whitening",
    tag: "1 Session",
    beforeImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800",
    afterImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(".gallery-item");

      items.forEach((item) => {
        // Soft wipe clipPath + scale up from 82%
        gsap.fromTo(
          item,
          { scale: 0.82, opacity: 0, clipPath: "inset(12% 12% 12% 12% round 40px)" },
          {
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSliderMove = (clientX: number) => {
    const sliderContainer = sliderContainerRef.current;
    if (!sliderContainer) return;

    const rect = sliderContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden border-b border-brand-teal/5 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header Block */}
        <div className="mb-20 max-w-xl">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Transformations
            </span>
          </div>
          <h2 className="block">
            <SplitText
              text="Our Smile Gallery"
              className="text-3xl md:text-5xl font-serif font-bold text-brand-teal tracking-tight"
              wordClassName="font-bold"
              scrub={true}
            />
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPos(50);
              }}
              className="gallery-item group relative h-[420px] rounded-3xl overflow-hidden bg-secondary-mint shadow-md cursor-pointer flex flex-col justify-end p-6"
              data-cursor="gallery"
            >
              {/* Patient Photo (After state shown by default) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.afterImg}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700 pointer-events-none"
                />
                {/* Soft Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/70 via-brand-teal/20 to-transparent z-10" />
              </div>

              {/* Tag indicator */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 border border-[#FAF9F6]/25 bg-brand-teal/85 backdrop-blur-sm rounded-full text-[9px] uppercase tracking-widest text-[#FAF9F6] font-semibold font-sans">
                  {item.tag}
                </span>
              </div>

              {/* Text labels */}
              <div className="relative z-10 space-y-1 pointer-events-none text-left">
                <span className="text-[10px] uppercase tracking-widest text-accent-coral font-sans font-bold">
                  {item.type}
                </span>
                <h3 className="text-xl font-serif text-[#FAF9F6] font-bold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Before/After Lightbox comparison slider */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 bg-brand-teal/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 text-[#FAF9F6] hover:text-accent-coral transition-colors p-2"
              aria-label="Close Lightbox"
            >
              <X size={30} />
            </button>

            {/* Slider Container Card */}
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8"
              onClick={(e) => e.stopPropagation()} // Prevent close
            >
              {/* Left Column: Draggable wipe slider */}
              <div
                ref={sliderContainerRef}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
                className="relative md:w-3/5 h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm cursor-ew-resize select-none bg-secondary-mint"
              >
                {/* AFTER IMAGE (Background) */}
                <img
                  src={transformations[activeIdx].afterImg}
                  alt="Smile After"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <span className="absolute bottom-4 right-4 bg-brand-teal/80 text-[#FAF9F6] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-sans font-bold z-20">
                  After
                </span>

                {/* BEFORE IMAGE (Clipped Overlay) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  {/* Keep image width matching container so it clips, not scales */}
                  <div className="absolute inset-y-0 left-0 w-[420px] sm:w-[500px] h-full">
                    <img
                      src={transformations[activeIdx].beforeImg}
                      alt="Smile Before"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <span className="absolute bottom-4 left-4 bg-accent-coral/95 text-[#FAF9F6] px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-sans font-bold z-20">
                    Before
                  </span>
                </div>

                {/* Central Drag Bar */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-[#FAF9F6] z-30 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Drag Handle Indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-coral border border-[#FAF9F6] flex items-center justify-center text-[#FAF9F6] shadow-md pointer-events-none">
                    <MoveHorizontal size={14} />
                  </div>
                </div>
              </div>

              {/* Right Column: Treatment Details */}
              <div className="md:w-2/5 flex flex-col justify-between text-left font-sans py-2">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-0.5 border border-brand-teal/20 bg-brand-teal/5 rounded-full">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-teal font-bold">
                      Case Study
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-brand-teal font-bold tracking-wide">
                    {transformations[activeIdx].title}
                  </h3>
                  
                  <div className="h-[1px] bg-brand-teal/10 my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-teal/55">Treatment</span>
                      <span className="text-brand-teal font-bold">{transformations[activeIdx].type}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-teal/55">Duration</span>
                      <span className="text-brand-teal font-bold">{transformations[activeIdx].tag}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-teal/55">Primary Doctor</span>
                      <span className="text-brand-teal font-bold">Dr. Sarah Chen</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-0">
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveIdx(null);
                      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-center block px-6 py-3.5 bg-brand-teal text-xs uppercase tracking-widest font-sans font-semibold text-[#FAF9F6] hover:bg-accent-coral transition-colors rounded-full"
                  >
                    Discuss Veneers
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
