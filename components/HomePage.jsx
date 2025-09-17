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
  const [bgDone, setBgDone] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/banner_main.svg";

    if (img.complete) {
      setBgDone(true);
      return;
    }

    img.onload = () => setBgDone(true);
    img.onerror = () => setBgDone(true);
  }, []);

  const ready = loaderDone && bgDone;

  return (
    <>
      {!ready && <Loader onFinish={() => setLoaderDone(true)} />}
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
