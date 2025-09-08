"use client";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const waitForAssets = async () => {
      const startTime = Date.now();

      // 1. Wait for all <img> tags
      const imgs = Array.from(document.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          img =>
            new Promise(resolve => {
              if (img.complete && img.naturalWidth !== 0) resolve();
              else img.onload = img.onerror = resolve;
            })
        )
      );

      // 2. Wait for all background images using data-bg
      const bgElements = document.querySelectorAll("[data-bg]");
      await Promise.all(
        Array.from(bgElements).map(
          el =>
            new Promise(resolve => {
              const img = new Image();
              img.src = el.dataset.bg;
              img.onload = img.onerror = resolve;
            })
        )
      );

      // 3. Ensure loader is visible at least 2 seconds
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(4000 - elapsed, 0); // 2s minimum

      setTimeout(() => {
        setIsVisible(false);
        onFinish?.();
      }, remaining);
    };

    if (document.readyState === "complete") waitForAssets();
    else window.addEventListener("load", waitForAssets);

    return () => window.removeEventListener("load", waitForAssets);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="loader-wrapper">
      <img
        src="/images/evolution_logo.svg"
        alt="Loading..."
        className="loader-logo"
        draggable="false"
      />
      <div className="loader-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
