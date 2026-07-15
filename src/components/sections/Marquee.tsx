"use client";

import { CheckCircle2 } from "lucide-react";

export default function Marquee() {
  const items = [
    "Delta Dental Preferred Provider",
    "Invisalign® Diamond Provider",
    "Same-Day Emergency Care Available",
    "Voted Best Smile Studio 2025",
    "ADA Certified Clinic",
    "AACD Member Cosmetic Dentist",
    "Cigna & MetLife Network Partner",
    "Eco-Friendly Clinical Space",
  ];

  // Duplicate items array to make a seamless loop
  const repeatedItems = [...items, ...items, ...items];

  return (
    <section
      id="marquee"
      className="relative bg-secondary-mint border-y border-brand-teal/10 py-6 overflow-hidden select-none"
    >
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee-strip flex items-center gap-12 whitespace-nowrap">
          {repeatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-bold text-brand-teal"
            >
              <CheckCircle2 size={14} className="text-accent-coral" />
              <span>{item}</span>
              <span className="text-brand-teal/20 ml-12">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
