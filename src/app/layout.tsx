import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Willow & Bright Dental Studio | Friendly & Premium Family Dentistry",
  description:
    "Warm, comfort-first dental care, porcelain veneers, Invisalign clear aligners, and aesthetic restorations. Experience gentle dentistry at Willow & Bright.",
  keywords: [
    "Willow & Bright",
    "Dental Studio",
    "Family Dentistry",
    "Invisalign",
    "Veneers Boston",
    "Aesthetic Dental",
    "Gentle Dentist",
  ],
  authors: [{ name: "Willow & Bright Dental Group" }],
  openGraph: {
    title: "Willow & Bright Dental Studio | Friendly & Premium Family Dentistry",
    description:
      "Warm, comfort-first dental care, porcelain veneers, Invisalign clear aligners, and aesthetic restorations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} antialiased`}
    >
      <body className="flex flex-col bg-off-white text-dark-charcoal">
        <SmoothScroll>
          {/* Custom interactive mouse cursor */}
          <CustomCursor />
          
          {/* Tactile film grain overlay */}
          <Noise />
          
          {/* Main content flow */}
          <main className="flex-grow">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
