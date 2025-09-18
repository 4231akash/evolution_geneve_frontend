"use client";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const waitForAssets = async () => {
      // --- collect promises for imgs, bg imgs, videos ---
      const imgPromises = Array.from(document.images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth !== 0) resolve();
            else img.onload = img.onerror = resolve;
          })
      );

      const bgPromises = Array.from(document.querySelectorAll("*"))
        .map((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          if (bg && bg !== "none" && bg.includes("url(")) {
            const url = bg.slice(5, -2);
            return new Promise((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = img.onerror = resolve;
            });
          }
          return null;
        })
        .filter(Boolean);

      const videoPromises = Array.from(document.querySelectorAll("video")).map(
        (video) =>
          new Promise((resolve) => {
            if (video.readyState >= 3) resolve();
            else video.onloadeddata = video.onerror = resolve;
          })
      );

      // Wait for everything, max 10s timeout
      await Promise.race([
        Promise.all([...imgPromises, ...bgPromises, ...videoPromises]),
        new Promise((resolve) => setTimeout(resolve, 10000)),
      ]);

      // 🔑 Prevent black flash → wait one paint cycle
      requestAnimationFrame(() => {
        setDone(true);
        onFinish?.();
        setTimeout(() => setHidden(true), 600); // after fade animation
      });
    };

    if (document.readyState === "complete") waitForAssets();
    else window.addEventListener("load", waitForAssets);

    return () => window.removeEventListener("load", waitForAssets);
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div
      className={`loader-wrapper ${done ? "loader-done" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000", // match your page background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.6s ease",
        zIndex: 9999,
        opacity: done ? 0 : 1,
      }}
    >
      <img
        src="/images/evolution_logo.svg"
        alt="Loading..."
        className="loader-logo"
        draggable="false"
      />
    </div>
  );
}
