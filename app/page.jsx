"use client";

import { useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import HeroSection from "../sections/HeroSection";
import TechnicalSpecsSection from "../sections/TechnicalSpecsSection";
import SundialSection from "../sections/Sundial_section";
import SandTimerSection from "../sections/SandTimerSection";
import ManualWindingSection from "../sections/ManualWindingSection";
import SelfWindingSection from "../sections/SelfWindingSection";
import useScrollOverlap from "../hooks/useScrollOverlap";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {!loadingDone && <Loader onFinish={() => setLoadingDone(true)} />}
      {loadingDone && (
        <>
          <Header />
          <MainContent />
        </>
      )}
    </>
  );
}

// Separate component for main content
function MainContent() {
  useScrollOverlap(); // ✅ initialize only after loader finishes

  return (
    <main>
      <HeroSection />
      <TechnicalSpecsSection />
      <SundialSection />
      <SandTimerSection />
      <ManualWindingSection />
      {/* // <SelfWindingSection /> */}
    </main>
  );
}

