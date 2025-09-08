"use client";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkImagesLoaded = () => {
      const images = Array.from(document.querySelectorAll("img"));
      const allLoaded = images.every(img => img.complete && img.naturalWidth !== 0);
      return allLoaded;
    };

    const handleLoad = () => {
      // Poll until all images are loaded
      const interval = setInterval(() => {
        if (checkImagesLoaded()) {
          clearInterval(interval);
          setIsVisible(false);
          if (onFinish) onFinish();
        }
      }, 100); // check every 100ms
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
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
