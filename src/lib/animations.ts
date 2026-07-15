import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set default ScrollTrigger config
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
