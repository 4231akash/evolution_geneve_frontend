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
  const [assetsLoaded, setAssetsLoaded] = useState(false);

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

  // Wrap preloaders in Promises
  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = "/images/banner_main.svg";
      img.onload = resolve;
      img.onerror = resolve; // resolve even on error
    });

  const preloadVideo = (src) =>
    new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.onloadeddata = resolve;
      video.onerror = resolve;
    });

  // Map assets to correct loader
  const preloaders = assets.map((src) =>
    src.match(/\.(png|jpg|jpeg|svg|gif)$/i)
      ? preloadImage(src)
      : preloadVideo(src)
  );

  // Wait for all or fallback after 5s
  Promise.race([
    Promise.all(preloaders),
    new Promise((resolve) => setTimeout(resolve, 5000)), // fallback timeout
  ]).then(() => {
    setLoaderDone(true);
  });
}, []);

  return (
    <>
      {!loaderDone && (
        <>
          <Loader onFinish={() => setLoaderDone(true)} />
        </>
      )}
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

