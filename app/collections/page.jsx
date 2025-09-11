"use client";

import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import JourneySection from "../../sections/journey/JourneySection";
import CollectionsPage from "../../sections/collection/CollectionPage";
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

  return (
    <main>
      <CollectionsPage />
    </main>
  );
}
