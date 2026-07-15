"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import SplitText from "@/components/ui/SplitText";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

function FloatingInput({ label, id, type = "text", ...props }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative border-b border-brand-teal/20 py-3 group select-none">
      <input
        id={id}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setValue(e.target.value);
        }}
        className="w-full bg-transparent border-none text-brand-teal text-sm focus:outline-none pt-4 pb-1 font-sans font-light"
        required
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 bottom-4 text-xs uppercase tracking-widest transition-all duration-300 pointer-events-none font-sans font-bold ${
          focused || value
            ? "text-[9px] text-accent-coral -translate-y-6"
            : "text-brand-teal/40"
        }`}
      >
        {label}
      </label>
      {/* Floating accent line on focus */}
      <div
        className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-coral transition-all duration-500 ${
          focused ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="booking"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden border-b border-brand-teal/5 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Main Panel wrapper with soft teal-to-mint gradient */}
        <div className="relative bg-gradient-to-br from-brand-teal to-secondary-mint/40 border border-brand-teal/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-brand-teal/5 rounded-3xl p-6 md:p-10 shadow-sm">
              <div className="mb-8">
                <div className="inline-block px-3 py-1 border border-brand-teal/10 bg-brand-teal/5 rounded-full mb-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
                    Reserve a Slot
                  </span>
                </div>
                <h3 className="block mb-3">
                  <SplitText
                    text="Let's Give You Something to Smile About"
                    className="text-2xl md:text-3xl font-serif font-bold text-brand-teal tracking-tight"
                    wordClassName="font-bold"
                  />
                </h3>
                <p className="text-xs text-brand-teal/70 font-sans font-light leading-relaxed">
                  Fill in the details below. A Willow & Bright care coordinator will call you to finalize your appointment details.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-secondary-mint/50 border border-brand-teal/20 flex items-center justify-center mx-auto text-brand-teal text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-brand-teal font-bold">
                    Booking Request Sent
                  </h4>
                  <p className="text-xs text-brand-teal/70 font-sans font-light max-w-xs mx-auto leading-relaxed">
                    Thank you. We will call you within two business hours to confirm your custom schedule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput label="Full Name" id="name" type="text" />
                    <FloatingInput label="Phone Number" id="phone" type="tel" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Treatment dropdown */}
                    <div className="relative border-b border-brand-teal/20 py-2.5 group">
                      <select
                        id="service"
                        className="w-full bg-transparent border-none text-brand-teal text-xs focus:outline-none pt-4 pb-1 font-sans font-semibold appearance-none cursor-pointer"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled className="bg-[#FAF9F6] text-brand-teal/40">
                          PREFERRED TREATMENT
                        </option>
                        <option value="general" className="bg-[#FAF9F6] text-brand-teal">General Dentistry</option>
                        <option value="cosmetic" className="bg-[#FAF9F6] text-brand-teal">Cosmetic & Veneers</option>
                        <option value="invisalign" className="bg-[#FAF9F6] text-brand-teal">Invisalign® Alignment</option>
                        <option value="implants" className="bg-[#FAF9F6] text-brand-teal">Dental Implants</option>
                        <option value="whitening" className="bg-[#FAF9F6] text-brand-teal">Teeth Whitening</option>
                        <option value="pediatric" className="bg-[#FAF9F6] text-brand-teal">Little Smiles Care</option>
                        <option value="emergency" className="bg-[#FAF9F6] text-brand-teal">Emergency Care</option>
                      </select>
                      <div className="absolute right-2 bottom-3 pointer-events-none text-brand-teal/30 text-[9px]">
                        ▼
                      </div>
                    </div>

                    {/* Insurance provider dropdown */}
                    <div className="relative border-b border-brand-teal/20 py-2.5 group">
                      <select
                        id="insurance"
                        className="w-full bg-transparent border-none text-brand-teal text-xs focus:outline-none pt-4 pb-1 font-sans font-semibold appearance-none cursor-pointer"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled className="bg-[#FAF9F6] text-brand-teal/40">
                          INSURANCE PROVIDER
                        </option>
                        <option value="delta" className="bg-[#FAF9F6] text-brand-teal">Delta Dental Preferred</option>
                        <option value="cigna" className="bg-[#FAF9F6] text-brand-teal">Cigna Network</option>
                        <option value="metlife" className="bg-[#FAF9F6] text-brand-teal">MetLife Network</option>
                        <option value="aetna" className="bg-[#FAF9F6] text-brand-teal">Aetna PPO</option>
                        <option value="bcbs" className="bg-[#FAF9F6] text-brand-teal">BlueCross BlueShield</option>
                        <option value="selfpay" className="bg-[#FAF9F6] text-brand-teal">Self-Pay / No Insurance</option>
                      </select>
                      <div className="absolute right-2 bottom-3 pointer-events-none text-brand-teal/30 text-[9px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput label="Preferred Date" id="date" type="date" />
                    <FloatingInput label="Your Message / Notes" id="notes" type="text" />
                  </div>

                  <div className="pt-6">
                    <Magnetic strength={0.15}>
                      <button
                        type="submit"
                        className="btn-coral-wipe inline-flex items-center gap-3.5 px-8 py-4 bg-brand-teal text-xs uppercase tracking-widest font-sans font-bold text-[#FAF9F6] border border-brand-teal rounded-full cursor-pointer group"
                      >
                        Request Appointment
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#FAF9F6]" />
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Address, Hours & Map (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10 lg:text-left text-brand-teal">
              
              {/* Address details */}
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-widest font-sans font-bold text-brand-teal">
                  Contact Information
                </div>
                <div className="space-y-4 font-sans font-light text-xs">
                  <div className="flex items-start gap-3.5 justify-start">
                    <MapPin className="text-accent-coral shrink-0 mt-0.5" size={18} />
                    <div className="leading-relaxed">
                      12 Willow Way, Suite 100<br />
                      Brighton, MA 02135
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 justify-start">
                    <Phone className="text-accent-coral shrink-0" size={18} />
                    <div className="font-semibold">(555) 234-9876</div>
                  </div>
                  <div className="flex items-center gap-3.5 justify-start">
                    <Mail className="text-accent-coral shrink-0" size={18} />
                    <div>hello@willowbrightdental.com</div>
                  </div>
                </div>
              </div>

              {/* Clinic Hours */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest font-sans font-bold text-brand-teal">
                  Studio Hours
                </div>
                <div className="space-y-2.5 font-sans text-xs font-light">
                  <div className="flex justify-between border-b border-brand-teal/10 pb-1.5">
                    <span className="flex items-center gap-2"><Calendar size={12} className="text-brand-teal/40" /> Mon — Thu</span>
                    <span className="font-semibold">08:00 — 19:00</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-teal/10 pb-1.5">
                    <span className="flex items-center gap-2"><Calendar size={12} className="text-brand-teal/40" /> Friday</span>
                    <span className="font-semibold">08:00 — 17:00</span>
                  </div>
                  <div className="flex justify-between text-accent-coral">
                    <span className="flex items-center gap-2"><Clock size={12} className="text-accent-coral/40" /> Sat — Sun</span>
                    <span className="font-bold">Closed / Emergencies</span>
                  </div>
                </div>
              </div>

              {/* Stylized custom map placeholder */}
              <div className="relative w-full h-[180px] rounded-3xl overflow-hidden border border-brand-teal/10 bg-[#FAF9F6]/85 flex flex-col items-center justify-center p-6 select-none group hover:border-accent-coral transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(#0f5c56_1px,transparent_1px)] [background-size:16px_16px] opacity-25 group-hover:scale-102 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-80" />
                
                <div className="relative z-10 text-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-accent-coral/15 border border-accent-coral/30 flex items-center justify-center mx-auto text-accent-coral animate-pulse">
                    <MapPin size={16} />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-teal">
                    Interactive Map
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-brand-teal/50 font-semibold">
                    Click to Open Google Maps
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Background shapes for the gradient panel */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-secondary-mint/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-accent-coral/10 rounded-full blur-[80px] pointer-events-none" />

        </div>

      </div>
    </section>
  );
}
