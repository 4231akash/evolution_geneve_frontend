"use client";

import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const preloadAssets = async () => {
      const startTime = Date.now();

      // --- helper for images
      const loadImage = (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = resolve;
        });

      // --- helper for videos
      const loadVideo = (src) =>
        new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = src;
          video.preload = "auto";
          video.muted = true;
          video.playsInline = true;

          video.onloadeddata = () => {
            // decode first frame to prevent black flash
            try {
              video.currentTime = 0.01;
              video.play().then(() => {
                video.pause();
                resolve();
              }).catch(resolve);
            } catch {
              resolve();
            }
          };

          video.onerror = resolve;
        });

      // --- preload all required assets
      await Promise.all([
        loadImage("/images/banner_main.svg"),
        loadVideo("/videos/map_draw_desktop.mp4"),
        loadVideo("/videos/mobile_video.mp4"),
      ]);

      // --- ensure loader is visible at least 1s
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(1000 - elapsed, 0);

      setTimeout(() => {
        setIsVisible(false);
        onFinish?.();
      }, remaining);
    };

    preloadAssets();
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
