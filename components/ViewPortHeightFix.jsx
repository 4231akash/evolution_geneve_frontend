// components/ViewportHeightFix.jsx
"use client";
import { useEffect } from "react";

export default function ViewportHeightFix() {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return null; // This component just runs JS, no UI
}
