// hooks/useFullpageScroll.js
"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFullpageScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const sections = gsap.utils.toArray("section");
    let currentIndex = 0;
    let isAnimating = false;

    function goToSection(index) {
      if (isAnimating || index < 0 || index >= sections.length) return;
      isAnimating = true;
      currentIndex = index;

      lenis.scrollTo(sections[currentIndex], {
        duration: 1.2,
        lock: true,
      });

      setTimeout(() => {
        isAnimating = false;
      }, 1300);
    }

    // detect wheel & touch with GSAP observer
    ScrollTrigger.observe({
      target: window,
      type: "wheel,touch,scroll",
      wheelSpeed: 1,
      onUp: () => goToSection(currentIndex - 1),
      onDown: () => goToSection(currentIndex + 1),
      tolerance: 10, // prevent accidental micro scrolls
      preventDefault: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);
}
