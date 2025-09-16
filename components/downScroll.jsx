"use client";

import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import rawAnimation from "../public/down_scroll.json";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function makeWhite(json) {
  const clone = JSON.parse(JSON.stringify(json));
  const walk = (obj) => {
    if (obj && typeof obj === "object") {
      if (obj.c && Array.isArray(obj.c.k)) {
        obj.c.k = [1, 1, 1, 1]; // force white
      }
      Object.values(obj).forEach(walk);
    }
  };
  walk(clone);
  return clone;
}

export default function DownScroll({ size = 100 }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => setMounted(true), []);

  const options = {
    animationData: makeWhite(rawAnimation),
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  if (!mounted) return null;

const handleClick = () => {
  if (isScrolling) return;

  const sections = document.querySelectorAll("section");
  if (!sections.length) return;

  const currentScroll = window.scrollY;
  let nextSection = null;

  // Find the first section below viewport
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    const top = rect.top + window.scrollY;

    if (top > currentScroll + 1) {
      nextSection = sections[i];
      break;
    }
  }

  // If no next section (we are at last section), go to first
  if (!nextSection || currentScroll >= sections[sections.length - 1].offsetTop - 1) {
    nextSection = sections[3]; // HeroSection
    console.log("Scrolling to top" + nextSection );
  }

  if (nextSection) {
    setIsScrolling(true);

    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: nextSection, offsetY: 0 },
      ease: "power2.inOut",
      onComplete: () => setIsScrolling(false),
    });
  }
};


  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 2147483647,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        padding: 8,
        cursor: isScrolling ? "not-allowed" : "pointer",
        opacity: isScrolling ? 0.6 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>{View}</div>
    </div>
  );
}
