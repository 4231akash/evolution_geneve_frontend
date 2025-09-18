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
            try {
              // decode first frame → prevents black flash
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
        // SVG
        loadImage("/images/banner_main.svg"),

        // Videos
        loadVideo("/videos/map_draw_desktop.mp4"),
        loadVideo("/videos/mobile_video.mp4"),

        // GIF backgrounds
        // loadImage("/videos/bg_sand_timer_video.gif"),
        // loadImage("/videos/bg_sundial_video.gif"),
        // loadImage("/videos/manual_winding_bg.gif"),
        // loadImage("/videos/self_winding_bg.gif"),

        // WebP watch images
        loadImage("/images/sundial_watch.webp"),
        loadImage("/images/sand_timer_watch.webp"),
        loadImage("/images/manual_winding_watch.webp"),
        loadImage("/images/self_winding_watch.webp"),
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
