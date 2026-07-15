"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const faqData = [
  {
    question: "Do you accept my dental insurance plan?",
    answer: "Yes, we accept most major PPO dental plans, including Delta Dental, Cigna, MetLife, Aetna, and BlueCross BlueShield. Our concierge team files claims directly on your behalf to maximize benefits.",
  },
  {
    question: "What should I expect during my first visit?",
    answer: "Your initial visit is a relaxed, 60-minute assessment. We start with a comfortable discussion of your health goals, take mess-free 3D digital scans, perform a soft-tissue screening, and design your smile roadmap.",
  },
  {
    question: "What financing options do you offer for cosmetic treatments?",
    answer: "We believe premium dental care should be accessible. In addition to insurance, we offer zero-interest clinical installment pathways, self-pay discounts, and partner with CareCredit for extended monthly financing.",
  },
  {
    question: "What are my options if I experience dental anxiety?",
    answer: "Helping anxious patients is our specialty. We provide sensory comfort packages (noise-canceling headphones, warm blankets, aromatherapy), gentle laser procedures that replace loud drills, and mild nitrous oxide sedation.",
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-brand-teal/10 py-5 select-none text-left">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-2 text-base font-serif font-bold text-brand-teal group cursor-pointer"
      >
        <span>{question}</span>
        {/* Rotating coral plus indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-accent-coral shrink-0 ml-4"
        >
          <Plus size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-brand-teal/80 font-sans font-light leading-relaxed pt-2 pb-4 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden border-b border-brand-teal/5 select-none"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Header Block */}
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Common Questions
            </span>
          </div>
          <h2 className="block mb-4">
            <SplitText
              text="Patient Support & FAQ"
              className="text-3xl md:text-4xl font-serif font-bold text-brand-teal tracking-tight"
              wordClassName="font-bold"
              scrub={true}
            />
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-2 border-t border-brand-teal/10">
          {faqData.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIdx === idx}
              onClick={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
