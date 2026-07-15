"use client";

import SplitText from "@/components/ui/SplitText";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const doctors = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Director & Family Dentist",
    credentials: "Harvard Dental School / 12 Yrs Exp.",
    quote: "“I love making dentistry gentle and approachable. Seeing patients lose their fear is my greatest reward.”",
    img: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=600",
  },
  {
    name: "Dr. Marcus Vance",
    role: "Orthodontics & Smile Architect",
    credentials: "Columbia Dental / Invisalign Diamond Specialist",
    quote: "“Aligning smiles is a blend of biology and sculpture. Every treatment path is tailored to the face.”",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600",
  },
  {
    name: "Evelyn Brooks, RDH",
    role: "Lead Aesthetic Dental Hygienist",
    credentials: "King's College London / 8 Yrs Exp.",
    quote: "“I believe cleanings can be a soothing ritual. Clean teeth support your overall body wellness.”",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600",
  },
];

export default function Doctors() {
  return (
    <section
      id="doctors"
      className="relative bg-off-white py-24 md:py-32 overflow-hidden border-b border-brand-teal/5 select-none"
    >
      {/* Background drifting blobs */}
      <div className="float-blob-coral top-1/3 -left-12" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="mb-20 max-w-xl">
          <div className="inline-block px-3 py-1 border border-brand-teal/20 bg-brand-teal/5 rounded-full mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-teal font-bold font-sans">
              Clinical Artistry
            </span>
          </div>
          <h2 className="block">
            <SplitText
              text="Our Care Specialists"
              className="text-3xl md:text-5xl font-serif font-bold text-brand-teal tracking-tight"
              wordClassName="font-bold"
              scrub={true}
            />
          </h2>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-5 text-left group"
            >
              {/* Profile Image Frame */}
              <div className="relative w-full h-[360px] lg:h-[420px] rounded-[2.5rem] overflow-hidden bg-secondary-mint shadow-md">
                <img
                  src={doc.img}
                  alt={doc.name}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                
                {/* Translucent overlay showing social handles on hover */}
                <div className="absolute inset-0 bg-brand-teal/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <a
                    href="#instagram"
                    className="w-10 h-10 rounded-full bg-[#FAF9F6] text-brand-teal flex items-center justify-center shadow-lg hover:bg-accent-coral hover:text-[#FAF9F6] transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href="#linkedin"
                    className="w-10 h-10 rounded-full bg-[#FAF9F6] text-brand-teal flex items-center justify-center shadow-lg hover:bg-accent-coral hover:text-[#FAF9F6] transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-teal/70 font-sans font-bold">
                  {doc.role}
                </span>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-teal relative inline-block">
                  {doc.name}
                  {/* Coral hover underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent-coral transition-all duration-500 group-hover:w-full" />
                </h3>
                
                <div className="text-[11px] uppercase tracking-[0.25em] text-brand-teal/55 font-sans font-semibold">
                  {doc.credentials}
                </div>

                <p className="text-xs md:text-sm text-brand-teal/75 font-sans font-light italic leading-relaxed pt-2 border-t border-brand-teal/5">
                  {doc.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
