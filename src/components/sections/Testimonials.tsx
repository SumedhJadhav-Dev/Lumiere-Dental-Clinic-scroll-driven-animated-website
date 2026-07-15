"use client";

import { useEffect, useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stories = [
  {
    quote: "“The comfort here is truly unmatched. I used to dread the dentist, but Dr. Chen and her team made me feel completely safe, listened to, and warm. The digital scanning was incredibly fast and easy!”",
    name: "Clara Montgomery",
    tag: "Veneers Patient",
    stars: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
  },
  {
    quote: "“Willow & Bright completely changed my perspective on orthodontics. Invisalign was invisible and fit my active career seamlessly. The 3D treatment mapping let me see the exact results beforehand!”",
    name: "David Reynolds",
    tag: "Invisalign® Patient",
    stars: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    quote: "“My daughter actually looks forward to her checkups now! The pediatric suites are so sensory-friendly, gentle, and quiet. They make little smiles feel extremely celebrated and safe.”",
    name: "Maria Thompson",
    tag: "Mother of 6-year-old patient",
    stars: 5,
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200",
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stories.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = () => {
    stopAutoplay();
    setActiveIdx((prev) => (prev - 1 + stories.length) % stories.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setActiveIdx((prev) => (prev + 1) % stories.length);
    startAutoplay();
  };

  // Coordinates for the drifting background blob shape
  const blobCoordinates = [
    { x: "12%", y: "15%" },
    { x: "45%", y: "30%" },
    { x: "32%", y: "10%" },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden border-b border-brand-teal/5 select-none"
    >
      {/* Drifting background blob positioned dynamically based on the active index */}
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full bg-accent-coral/8 filter blur-[70px] pointer-events-none z-0"
        animate={{
          left: blobCoordinates[activeIdx].x,
          top: blobCoordinates[activeIdx].y,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center">
        {/* Header Block */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Patient Stories
            </span>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="min-h-[280px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="space-y-6 flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex gap-1.5 justify-center">
                {[...Array(stories[activeIdx].stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent-coral text-accent-coral"
                  />
                ))}
              </div>

              {/* Large quote */}
              <blockquote className="text-xl md:text-2xl font-serif text-brand-teal font-medium leading-relaxed italic max-w-3xl">
                {stories[activeIdx].quote}
              </blockquote>

              {/* Patient Profile */}
              <div className="flex items-center gap-3.5 pt-4 text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-teal/10 bg-secondary-mint shadow-inner">
                  <img
                    src={stories[activeIdx].img}
                    alt={stories[activeIdx].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-teal leading-none">
                    {stories[activeIdx].name}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-teal/50 font-bold mt-1">
                    {stories[activeIdx].tag}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-brand-teal/10 hover:border-accent-coral text-brand-teal hover:text-accent-coral flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous story"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Index Dots */}
          <div className="flex gap-2">
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  stopAutoplay();
                  setActiveIdx(idx);
                  startAutoplay();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx ? "w-6 bg-accent-coral" : "bg-brand-teal/15 hover:bg-brand-teal/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-brand-teal/10 hover:border-accent-coral text-brand-teal hover:text-accent-coral flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next story"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
