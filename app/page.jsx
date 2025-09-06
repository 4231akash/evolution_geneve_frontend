// app/page.js
"use client";

import Header from "../components/Header";
import HeroSection from "../sections/HeroSection";
import TechnicalSpecsSection from "../sections/TechnicalSpecsSection";
import SundialSection from "../sections/Sundial_section";
import SandTimerSection from "../sections/SandTimerSection";
import ManualWindingSection from "../sections/ManualWindingSection";
import SelfWindingSection from "../sections/SelfWindingSection";
import ScrollIndicator from "../components/ScrollIndicator";
import useScrollOverlap from "../hooks/useScrollOverlap";

export default function Home() {
  useScrollOverlap();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TechnicalSpecsSection />
        <SundialSection />  
        <SandTimerSection />
        <ManualWindingSection />
        <SelfWindingSection />

      </main>
      {/* <Footer /> */}
      <ScrollIndicator />
    </>
  );
}
