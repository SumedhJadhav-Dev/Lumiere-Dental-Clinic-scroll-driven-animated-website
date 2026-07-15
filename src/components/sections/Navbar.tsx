"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Smile Gallery", href: "#gallery" },
    { label: "Doctors", href: "#doctors" },
    { label: "Insurance", href: "#booking" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 select-none ${
        isScrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-md py-3.5 shadow-sm border-b border-brand-teal/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Left Side: Brand Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="flex items-center gap-2 group font-serif italic text-xl font-bold tracking-tight text-brand-teal"
        >
          {/* Logo Mark */}
          <svg
            width="24"
            height="24"
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
          <span className="font-serif text-[18px] md:text-[20px] font-semibold text-brand-teal leading-none">
            Willow & Bright
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="nav-link-hover text-xs uppercase tracking-widest font-sans font-semibold text-brand-teal/80 hover:text-brand-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side: Phone & Coral CTA Button */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Contact number with pulsing online indicator */}
          <div className="flex items-center gap-2.5 font-sans">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <a
              href="tel:5552349876"
              className="text-xs font-semibold tracking-wider text-brand-teal/85 hover:text-brand-teal transition-colors flex items-center gap-1.5"
            >
              <Phone size={12} className="text-accent-coral" />
              (555) 234-9876
            </a>
          </div>

          <Magnetic strength={0.15}>
            <a
              href="#booking"
              onClick={(e) => scrollToSection(e, "#booking")}
              className="btn-coral-wipe inline-flex items-center justify-center px-6 py-2.5 bg-brand-teal text-xs uppercase tracking-widest font-sans font-semibold text-[#FAF9F6] border border-brand-teal hover:border-accent-coral hover:text-[#FAF9F6] rounded-full"
            >
              Book Your Visit
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-brand-teal p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#FAF9F6] z-30 flex flex-col justify-between p-8 border-t border-brand-teal/5 animate-fade-in lg:hidden">
          <div className="flex flex-col gap-6 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-medium text-brand-teal hover:text-accent-coral transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-6 pt-6 border-t border-brand-teal/10">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <a
                href="tel:5552349876"
                className="text-sm font-semibold text-brand-teal flex items-center gap-2"
              >
                <Phone size={14} className="text-accent-coral" />
                (555) 234-9876
              </a>
            </div>

            <a
              href="#booking"
              onClick={(e) => scrollToSection(e, "#booking")}
              className="w-full text-center block px-6 py-4 bg-brand-teal text-xs uppercase tracking-widest font-sans font-semibold text-[#FAF9F6] hover:bg-accent-coral transition-colors rounded-full"
            >
              Book Your Visit
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
