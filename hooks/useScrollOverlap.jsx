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

        const next = sections[i + 1];

        // spacing below current section (dynamic for mobile)
        const spacing = Math.min(window.innerHeight * 0.3, 200); // max 200px
        gsap.set(next, { marginTop: spacing });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight + spacing}`, // dynamic end distance
            pin: true,
            pinSpacing: false,
            scrub: Math.max(0.5, window.innerHeight / 1200), // adapt scrub speed
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(section, {
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
        });
      });

      // Parallax effect (dynamic based on section height)
      gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
        const parentHeight = bg.closest("section").offsetHeight;
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: Math.max(0.5, window.innerHeight / 1200), // slower scrub on mobile
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
