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

    let loadedCount = 0;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === assets.length) {
        // add min wait for smoothness
        setTimeout(() => setAssetsLoaded(true));
      }
    };

    assets.forEach((src) => {
      if (src.endsWith(".mp4")) {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;

        video.onloadeddata = () => {
          // force decode first frame
          try {
            video.currentTime = 0.01;
            video.play().then(() => {
              video.pause();
              checkDone();
            }).catch(checkDone);
          } catch {
            checkDone();
          }
        };

        video.onerror = checkDone;
      } else {
        const img = new Image();
        img.src = src;
        img.onload = checkDone;
        img.onerror = checkDone;
      }
    });
  }, []);

  const ready = loaderDone && assetsLoaded;

  return (
    <>
      {!ready && (
        <>
          <PreloadVideos /> {/* 👈 keep videos mounted & decoding */}
          <Loader onFinish={() => setLoaderDone(true)} />
        </>
      )}
      {ready && (
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
    <main style={{ backgroundColor: "#000" }}>
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

/** 👇 hidden pre-mount video elements */
function PreloadVideos() {
  return (
    <div style={{ display: "none" }}>
      <video src="/videos/map_draw_desktop.mp4" preload="auto" muted playsInline />
      <video src="/videos/mobile_video.mp4" preload="auto" muted playsInline />
    </div>
  );
}
