"use client";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import HeroSection from "../sections/home/HeroSection";
import TechnicalSpecsSection from "../sections/home/TechnicalSpecsSection";
import SundialSection from "../sections/home/Sundial_section";
import SandTimerSection from "../sections/home/SandTimerSection";
import ManualWindingSection from "../sections/home/ManualWindingSection";
import SelfWindingSection from "../sections/home/SelfWindingSection";
import useScrollOverlap from "../hooks/useScrollOverlap";
import DownScroll from "../components/downScroll";

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const assets = [
      "/images/banner_main.svg",
      "/videos/bg_sand_timer_video.gif",
      "/videos/bg_sundial_video.gif",
      "/videos/manual_winding_bg.gif",
      "/videos/self_winding_bg.gif",
      "/videos/map_draw_desktop.mp4",
      "/videos/mobile_video.mp4",
    ];

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // resolve even if error
      });

    const preloadVideo = (src) =>
      new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.style.position = "absolute";
        video.style.left = "-9999px";
        document.body.appendChild(video);

        const done = () => {
          video.remove();
          resolve();
        };

        // Wait until browser can actually play through
        video.oncanplaythrough = done;
        video.onerror = done;

        video.load();
      });

    const preloaders = assets.map((src) =>
      src.match(/\.(png|jpe?g|svg|gif)$/i)
        ? preloadImage(src)
        : preloadVideo(src)
    );

    Promise.all(preloaders).then(() => {
      setLoaderDone(true); // ✅ only after ALL are ready
    });
  }, []);

  return (
    <>
      {!loaderDone && <Loader />}
      {loaderDone && (
        <>
          <Header />
          <MainContent />
        </>
      )}
    </>
  );
}

function MainContent() {
  useScrollOverlap();

  return (
    <main>
      <HeroSection />
      <TechnicalSpecsSection />
      <SundialSection />
      <SandTimerSection />
      <ManualWindingSection />
      <SelfWindingSection />
      <DownScroll />
    </main>
  );
}
