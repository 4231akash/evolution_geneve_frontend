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
import useFullpageScroll from "../hooks/useFullPageScroll";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [bgDone, setBgDone] = useState(false);

  // Preload hero background while loader plays (avoids circular mount dependency)
  useEffect(() => {
    const img = new Image();
    img.src = "/images/banner_main.svg";

    if (img.complete) {
      setBgDone(true);
      return;
    }

    img.onload = () => setBgDone(true);
    img.onerror = (err) => {
      console.warn("Hero background failed to load:", err);
      setBgDone(true); // allow site to proceed even if bg fails
    };
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
    </main>
  );
}

// function MainContent() {
//   useFullpageScroll();

//   return (
//     <main>
//       <section><HeroSection /></section>
//       <section><TechnicalSpecsSection /></section>
//       <section><SundialSection /></section>
//       <section><SandTimerSection /></section>
//       <section><ManualWindingSection /></section>
//       <section><SelfWindingSection /></section>
//     </main>
//   );
// }
