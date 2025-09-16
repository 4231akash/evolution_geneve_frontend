"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/collections/Collections.module.css";
import { watchVariants } from "./watchVariants";
import Loader from "../../components/Loader";
import Header from "../../components/Header";

// ---------------- Home Page ----------------
export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [bgDone, setBgDone] = useState(false);

  // Preload hero background while loader plays
useEffect(() => {
  const browserImage = new window.Image(); // explicitly use window.Image
  browserImage.src = "/images/banner_main.svg";

  if (browserImage.complete) {
    setBgDone(true);
    return;
  }

  browserImage.onload = () => setBgDone(true);
  browserImage.onerror = (err) => {
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

// ---------------- Main Content ----------------
function MainContent() {
  return (
    <main>
      <CollectionsPages />
    </main>
  );
}

// ---------------- Collections Pages ----------------
function CollectionsPages() {
  const [selectedVariant, setSelectedVariant] = useState(watchVariants[0]);
  const [hideInfo, setHideInfo] = useState(false);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HERO / Preview */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Link
            href={`/collections/${selectedVariant.id}`}
            className={styles.watchImageWrapper}
            aria-label={`View ${selectedVariant.strapColor} details`}
            onMouseEnter={() => setHideInfo(true)}
            onMouseLeave={() => setHideInfo(false)}
          >
            <div className={styles.watchImageWrapper2}>
              <Image
                key={selectedVariant.id}
                src={selectedVariant.image}
                alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
                fill
                className={styles.watchImage}
                priority
              />
            </div>

            {/* Overlay info (always visible on image) */}
            <div className={styles.watchInfo2}>
              <h2>{selectedVariant.name}</h2>
              <p>{selectedVariant.model}</p>
              <p>{selectedVariant.material}</p>
              <span>Limited to 600 pieces</span>
            </div>
          </Link>

          {/* Side info + swatches */}
          <div className={styles.swatchAngle}>
            {!hideInfo && (
              <div className={styles.watchInfo}>
                <h2>{selectedVariant.name}</h2>
                <p>{selectedVariant.model}</p>
                <p>{selectedVariant.material}</p>
                <span>Limited to 600 pieces</span>
              </div>
            )}

            {!hideInfo && (
              <div className={styles.swatchContainer}>
                {watchVariants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`${styles.swatch} ${
                      selectedVariant.id === variant.id ? styles.activeSwatch : ""
                    }`}
                    onClick={() => handleVariantSelect(variant)}
                    aria-label={`Select ${variant.strapColor} strap`}
                  >
                    <img
                      src={variant.swatch}
                      alt={`${variant.strapColor} swatch`}
                      width={50}
                      height={50}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
