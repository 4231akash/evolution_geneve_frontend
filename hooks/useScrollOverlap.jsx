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

        const next = sections[i + 1];

        // add manual spacing below current section
        // (so next section doesn’t jump immediately)
        gsap.set(next, { marginTop: 200 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight + 200}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true, // ✅ helps prevent stutter at fast swipes
            invalidateOnRefresh: true,
          },
        });

        tl.to(section, {
          opacity: 1,
          duration: 2.5,
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
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
}
