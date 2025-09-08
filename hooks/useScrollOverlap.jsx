// hooks/useScrollOverlap.jsx
"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollOverlap() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("section");

      sections.forEach((section, i) => {
        if (i === sections.length - 1) return;

        // Timeline per section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight}`, // exactly 100vh scroll space
            pin: true,
            pinSpacing: false,
            scrub: 0.05, // << much smaller scrub for slower response
            anticipatePin: 1, // prevents jumpiness
          },
        });

        // The section animation (could be fade, scale, etc.)
        tl.to(section, {
          opacity: 1,
          duration: 2.5, // enforce some time per section
          ease: "power2.out",
        });
      });

      // Parallax effect
      gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Smooth snap between sections
      // ScrollTrigger.create({
      //   trigger: document.body,
      //   start: 0,
      //   end: "max",
      //   snap: {
      //     snapTo: 1 / (sections.length - 1), // snap to nearest section
      //     duration: 1.2, // always glide 1.2s to the next section
      //     delay: 0.1, // wait a bit before snapping
      //     ease: "power2.inOut",
      //   },
      // });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
