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

  return (
    <>
      {!loaderDone && <Loader onFinish={() => setLoaderDone(true)} />}
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

