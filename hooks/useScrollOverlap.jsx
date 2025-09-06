"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollOverlap() {
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray("section");

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false, // no extra space left behind
        scrub: true,
      });
    });

    // Parallax effect for background images
    gsap.utils.toArray("section .parallax-bg").forEach((bg) => {
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: bg.closest("section"),
          start: "top bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false, // no extra space left behind
          scrub: true,
        },
      });
    });

    // Cleanup on unmount
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}
