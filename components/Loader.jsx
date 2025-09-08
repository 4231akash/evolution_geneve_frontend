"use client";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // ⏳ Keep loader for 2 seconds before hiding
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 2000); // 2s delay
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
