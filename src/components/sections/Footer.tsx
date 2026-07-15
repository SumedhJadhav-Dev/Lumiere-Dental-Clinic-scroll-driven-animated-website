"use client";

import { ArrowUp, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkScroll = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      className="relative bg-off-white pt-24 pb-12 overflow-hidden select-none border-t border-brand-teal/5"
    >
      {/* Background blobs for depth */}
      <div className="float-blob-teal bottom-0 left-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Top Grid: Logo, Sitemap, Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-brand-teal/10">
          
          {/* Logo & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <a
              href="#home"
              onClick={(e) => handleLinkScroll(e, "#home")}
              className="flex items-center gap-2 group font-serif italic text-2xl font-bold tracking-tight text-brand-teal"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:rotate-12 transition-transform duration-500"
              >
                <path
                  d="M50 18C42 18 32 23 32 44C32 54 36 65 43 75C47 80 50 80 50 78C50 80 53 80 57 75C64 65 68 54 68 44C68 23 58 18 50 18Z"
                  stroke="#FF8B6B"
                  strokeWidth="8"
                />
              </svg>
              <span className="font-serif text-[20px] font-semibold text-brand-teal leading-none">
                Willow & Bright
              </span>
            </a>
            
            <p className="text-xs md:text-sm text-brand-teal/70 font-sans font-light leading-relaxed max-w-sm">
              We design balanced smiles that harmonize with your facial architecture, prioritizing clinical precision, patient comfort, and dental art.
            </p>

            {/* Social icons with magnetic wrap */}
            <div className="flex gap-4">
              <Magnetic strength={0.2}>
                <a
                  href="#instagram"
                  className="w-9 h-9 rounded-full border border-brand-teal/10 text-brand-teal flex items-center justify-center hover:border-accent-coral hover:text-accent-coral transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#linkedin"
                  className="w-9 h-9 rounded-full border border-brand-teal/10 text-brand-teal flex items-center justify-center hover:border-accent-coral hover:text-accent-coral transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#facebook"
                  className="w-9 h-9 rounded-full border border-brand-teal/10 text-brand-teal flex items-center justify-center hover:border-accent-coral hover:text-accent-coral transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Sitemap Columns (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 font-sans text-left">
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-brand-teal font-bold">
                Explore
              </div>
              <ul className="space-y-3.5 text-xs text-brand-teal/70 font-light">
                <li>
                  <a href="#about" onClick={(e) => handleLinkScroll(e, "#about")} className="hover:text-accent-coral transition-colors">About Difference</a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleLinkScroll(e, "#services")} className="hover:text-accent-coral transition-colors">Treatments</a>
                </li>
                <li>
                  <a href="#journey" onClick={(e) => handleLinkScroll(e, "#journey")} className="hover:text-accent-coral transition-colors">Our Journey</a>
                </li>
                <li>
                  <a href="#doctors" onClick={(e) => handleLinkScroll(e, "#doctors")} className="hover:text-accent-coral transition-colors">Specialists</a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-brand-teal font-bold">
                Resources
              </div>
              <ul className="space-y-3.5 text-xs text-brand-teal/70 font-light">
                <li>
                  <a href="#gallery" onClick={(e) => handleLinkScroll(e, "#gallery")} className="hover:text-accent-coral transition-colors">Smile Gallery</a>
                </li>
                <li>
                  <a href="#testimonials" onClick={(e) => handleLinkScroll(e, "#testimonials")} className="hover:text-accent-coral transition-colors">Patient Stories</a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => handleLinkScroll(e, "#faq")} className="hover:text-accent-coral transition-colors">FAQs</a>
                </li>
                <li>
                  <a href="#booking" onClick={(e) => handleLinkScroll(e, "#booking")} className="hover:text-accent-coral transition-colors">Appointments</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="text-[10px] uppercase tracking-widest text-brand-teal font-bold">
              Get Smile Tips & Offers
            </div>
            <p className="text-xs text-brand-teal/70 font-sans font-light leading-relaxed">
              Subscribe to stay updated on clinical updates, aesthetic advancements, and oral hygiene tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-brand-teal/20 py-2 items-center group relative mt-2"
            >
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-transparent border-none text-brand-teal text-xs focus:outline-none py-1.5 uppercase font-sans tracking-widest font-bold"
                required
              />
              <button
                type="submit"
                className="text-brand-teal/50 hover:text-accent-coral transition-colors ml-2 cursor-pointer p-1"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
              {/* Highlight line on focus */}
              <div className="absolute bottom-0 left-0 h-[1.5px] bg-accent-coral w-0 group-focus-within:w-full transition-all duration-500" />
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 font-sans text-[9px] uppercase tracking-widest text-brand-teal/40">
          <div>
            © {new Date().getFullYear()} Willow & Bright Dental Studio. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-accent-coral transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-accent-coral transition-colors">Terms of Service</a>
            
            {/* Back to top button styled as small tooth/arrow */}
            <button
              onClick={handleScrollToTop}
              className="group flex items-center gap-2.5 text-brand-teal/60 hover:text-accent-coral transition-colors duration-300 cursor-pointer py-1"
            >
              Back to Top
              <span className="w-8 h-8 rounded-full border border-brand-teal/15 flex items-center justify-center group-hover:border-accent-coral transition-colors">
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Large watermark brand mark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[42%] select-none pointer-events-none opacity-[0.03] text-center w-full">
        <span className="font-serif italic font-semibold text-[17vw] text-brand-teal tracking-tighter">
          Willow & Bright
        </span>
      </div>
    </footer>
  );
}
