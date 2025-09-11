"use client";

import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import JourneySection from "../../sections/journey/JourneySection";
import useScrollOverlap from "../../hooks/useScrollOverlap";
import styles from "../../styles/journey/JourneySection.module.css";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [bgDone, setBgDone] = useState(false);

  // Preload hero background while loader plays
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
  // Hook to manage ScrollTrigger overlap behavior
  // useScrollOverlap();

  const founderTextBlocks = [
    "Hady Makhoul a Lebanese-Bahraini entrepreneur has dedicated more than 25 years to the art and business of fine watchmaking. Beginning his career with a deep appreciation for craftsmanship and precision, he immersed himself in the world of horology, mastering every detail from design to mechanics.",
    "Over the decades, he built a reputation for excellence, working closely with collectors, enthusiasts, and brands who valued his expertise and vision. His journey reflects not only a career but also a lifelong passion for timekeeping and the artistry behind every watch.",
    "Driven by a desire to push beyond tradition, he eventually turned his experience into creation. He Designed and developed a truly special timepiece that embodies his philosophy, blending timeless elegance with modern innovation. This watch is far more than a tool to tell time it is the story of the timepiece evolution throughout ages on the wrist.",
  ];

  const watchTextBlocks = [
    "Allow me to introduce to you a timepiece that transcends mere functionality to embody the very essence of time itself.",
    "This Swiss-made watch, meticulously crafted with reverence for horological history, is a testament to the enduring beauty of tradition and innovation. Within its elegant design lies the history of timepiece Evolution, harmonizing ancient and modern timekeeping elements.",
    "The Sundial a oldest timepiece device came from the ancient Egyptian shadow clock built around 1500 BCE. The Sand Timer a sand clock device known to have existed in Babylon and Egypt as early as the 16th century BCE.",
    "The Manual winding a mechanical watches movement evolved in Europe in the 17th Century from spring powered clocks, which appeared in the 15th Century. The Self winding The early 20th Century marked a turning point with the invention of the rotor system harnessed the motion of the wearer's wrist to power the winding.",
    "As the owner of this extraordinary watch, I am honored to present to you not just a timekeeping device, but a tangible link to our shared past and a beacon of inspiration for the future.",
  ];

  return (
    <main className={styles.journeyMain}>
      <div className={styles.journeyTitle}>
        <h1>
          <span>Our</span> Journey
        </h1>
      </div>
      {/* Section 1: Founder */}
      <JourneySection
        imageSrc="/images/founder_watch.png"
        imageAlt="Founder Hady Makhoul"
        caption="Hady Makhoul"
        captionTitle="Founder and Designer"
        textBlocks={founderTextBlocks}
      />

      {/* Section 2: Watch */}
      <JourneySection
        imageSrc="/images/leather_watch.png"
        imageAlt="Evolution Geneve Watch"
        textBlocks={watchTextBlocks}
        reverseLayout={true}
      />
    </main>
  );
}
