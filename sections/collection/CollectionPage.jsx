"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../styles/collections/Collections.module.css";
import Image from "next/image";

// Data for our watch variants
const watchVariants = [
  {
    id: "burgundy",
    name: "FIRST EVOLUTION",
    model: "EV001",
    material: "STAINLESS STEEL",
    strapColor: "Burgundy",
    image: "/images/watch_main.png",
    swatch: "/images/brown_swatch.png",
    details: [
      {
        title: "CASE",
        content: [
          "Stainless steel case polished / brushed",
          "Diameter 41mm",
          "Thickness 9mm",
        ],
      },
      {
        title: "BACKCASE",
        content: [
          "Stainless steel case polished / brushed.",
          "Engraved ancient sundial.",
          "Semi-skeleton sapphire crystal glass showing the automatic movement.",
          "8 back screws",
        ],
      },
      {
        title: "CROWN",
        content: [
          "A vintage design crown on the right side to wind and adjust the time for the manual winding mechanical movement, symbolizing the 17th century.",
          "A modern design crown on the left side to wind and adjust the time for the self winding mechanical movement, symbolizing the 20th century.",
        ],
      },
      {
        title: "GLASS",
        content: ["Curved sapphire crystal glass."],
      },
      {
        title: "DIAL",
        content: [
          "Background set with natural walnut wood.",
          "Off-white subdial with roman numbers and golden retro pattern (17th century).",
          "Off-white subdial with western arabic index (20th century).",
          "Sand-timer with natural sand (~10 seconds), symbolizing the 16th century BCE.",
        ],
      },
      {
        title: "WATER RESISTANCE",
        content: ["3 Atm – 30 Meter"],
      },
      {
        title: "STRAP",
        content: [
          "Hand made genuine alligator strap with a built in metal that fits the case.",
        ],
      },
      {
        title: "BUCKLE",
        content: ["Stainless steel pin buckle polished / brushed."],
      },
      {
        title: "MOVEMENT",
        content: [
          "Right side: Swiss manual winding movement caliber evm001, hours minutes, vintage hands. 39 hours power reserve.",
          "Left side: Swiss automatic movement caliber eva001, luminous hands, seconds, modern hands. 39 hours power reserve.",
        ],
      },
    ],
  },
  {
    id: "orange",
    name: "FIRST EVOLUTION",
    model: "EV001",
    material: "STAINLESS STEEL",
    strapColor: "Orange",
    image: "/images/orange_main.webp",
    swatch: "/images/orange_swatch.png",
    details: [
      {
        title: "CASE",
        content: [
          "Stainless steel case polished / brushed",
          "Diameter 41mm",
          "Thickness 9mm",
        ],
      },
      {
        title: "BACKCASE",
        content: [
          "Stainless steel case polished / brushed.",
          "Engraved ancient sundial.",
          "Semi-skeleton sapphire crystal glass showing the automatic movement.",
          "8 back screws",
        ],
      },
      {
        title: "CROWN",
        content: [
          "A vintage design crown on the right side to wind and adjust the time for the manual winding mechanical movement, symbolizing the 17th century.",
          "A modern design crown on the left side to wind and adjust the time for the self winding mechanical movement, symbolizing the 20th century.",
        ],
      },
      {
        title: "GLASS",
        content: ["Curved sapphire crystal glass."],
      },
      {
        title: "DIAL",
        content: [
          "Background set with natural walnut wood.",
          "Off-white subdial with roman numbers and golden retro pattern (17th century).",
          "Off-white subdial with western arabic index (20th century).",
          "Sand-timer with natural sand (~10 seconds), symbolizing the 16th century BCE.",
        ],
      },
      {
        title: "WATER RESISTANCE",
        content: ["3 Atm – 30 Meter"],
      },
      {
        title: "STRAP",
        content: [
          "Hand made genuine alligator strap with a built in metal that fits the case.",
        ],
      },
      {
        title: "BUCKLE",
        content: ["Stainless steel pin buckle polished / brushed."],
      },
      {
        title: "MOVEMENT",
        content: [
          "Right side: Swiss manual winding movement caliber evm001, hours minutes, vintage hands. 39 hours power reserve.",
          "Left side: Swiss automatic movement caliber eva001, luminous hands, seconds, modern hands. 39 hours power reserve.",
        ],
      },
    ],
  },
];

export default function CollectionsPage() {
  const [selectedVariant, setSelectedVariant] = useState(watchVariants[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);
  const [hideInfo, setHideInfo] = useState(false); // 👈 boolean handle
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [slideInSpecs, setSlideInSpecs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const triggerStart = window.innerHeight * 0.8; // start animation
      const triggerEnd = 100; // animation stops when scrolled past

      if (sectionRect.top < triggerStart && sectionRect.bottom > triggerEnd) {
        setSlideInSpecs(true);
      } else {
        setSlideInSpecs(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll(); // check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleVariantSelect = (variant) => {
    if (selectedVariant.id !== variant.id) {
      setSelectedVariant(variant);
      setIsAnimating(true);
    }
  };

  const handleBackToOverview = () => {
    setIsDetailView(false);
  };
  useEffect(() => {
    const updatePin = () => {
      if (!sectionRef.current || !containerRef.current || !stickyRef.current)
        return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const stickyEl = stickyRef.current;
      const stickyHeight = stickyEl.offsetHeight;
      const topOffset = 80; // header height if needed
      const isDesktop = window.innerWidth >= 479;

      const shouldPin =
        isDesktop &&
        sectionRect.top <= topOffset &&
        sectionRect.bottom > topOffset + stickyHeight;

      if (shouldPin) {
        containerRef.current.style.minHeight = `${stickyHeight}px`;
        stickyEl.style.position = "fixed";
        stickyEl.style.top = `${topOffset}px`;
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.width = `${containerRect.width}px`;
      } else if (sectionRect.bottom <= topOffset + stickyHeight) {
        // --- stick at bottom ---
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "absolute";
        stickyEl.style.top = "auto";
        stickyEl.style.bottom = "0";
        stickyEl.style.left = `${containerRect.left}px`; // ✅ FIXED
        stickyEl.style.width = `${containerRect.width}px`; // ✅ FIXED
      } else {
        // --- before pin ---
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "relative";
        stickyEl.style.top = "";
        stickyEl.style.bottom = "";
        stickyEl.style.left = "0";
        stickyEl.style.width = "100%";
      }
    };

    window.addEventListener("scroll", updatePin);
    window.addEventListener("resize", updatePin);
    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, []);

  const renderHeroView = () => (
    <section className={styles.heroSection}>
      <p className={styles.brandTitle}>EVOLUTION GENÈVE</p>
      <div className={styles.heroContent}>
        <div
          className={styles.watchImageWrapper}
          onClick={() => setIsDetailView(true)}
          onMouseEnter={() => setHideInfo(true)} // 👈 hide on hover
          onMouseLeave={() => setHideInfo(false)} // 👈 show back
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

          <div className={styles.watchInfo2}>
            <h2>{selectedVariant.name}</h2>
            <p>{selectedVariant.model}</p>
            <p>{selectedVariant.material}</p>
            <span>Limited to 600 pieces</span>
          </div>
          {/* Conditionally render / hide this block */}
        </div>
        <div className={styles.swatchAngle}>
          {!hideInfo && (
            <div className={`${styles.watchInfo} ${styles.withPadInfo}`}>
              <h2>{selectedVariant.name}</h2>
              <p>{selectedVariant.model}</p>
              <p>{selectedVariant.material}</p>
              <span>Limited to 600 pieces</span>
            </div>
          )}

          <div
            className={`${styles.swatchContainer} ${
              hideInfo ? styles.noPad : styles.withPad
            }`}
          >
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
        </div>
      </div>
    </section>
  );
  const renderHeroViewMain = () => (
    <section className={styles.heroSection2}>
      <div className={styles.heroContent2}>
        <div className={styles.watchInfoMain}>
          <div>
            <p>{selectedVariant.name}</p>
            <p>{selectedVariant.model}</p>
            <p>{selectedVariant.material}</p>
            <p>Limited to 600 pieces</p>
          </div>
        </div>
        <div
          className={`${styles.watchImageWrapper10} ${
            isAnimating ? styles.imagePop : ""
          }`}
          onClick={() => setIsDetailView(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            key={selectedVariant.id}
            src={selectedVariant.image}
            alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
            className={styles.watchImage}
          />
        </div>
      </div>
      <div className={styles.swatchContainer2}>
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
    </section>
  );
  const renderDetailView = () => (
    <div className={styles.overall}>
      {renderHeroViewMain()}
      <section className={styles.detailsSection} ref={sectionRef}>
        <div className={styles.detailsContentWrapper}>
          <div
            className={`${styles.specsContainer} ${
              slideInSpecs ? styles.slideIn : ""
            }`}
          >
            <button
              onClick={handleBackToOverview}
              className={styles.backButton}
            >
              &larr; Back to Overview
            </button>

            <ul className={styles.specList}>
              {selectedVariant.details.map((detail, index) => (
                <li key={index}>
                  <h4>{detail.title}:</h4>
                  {detail.content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.stickyImageContainer} ref={containerRef}>
            <div className={styles.stickyWrapper} ref={stickyRef}>
              <img
                key={`${selectedVariant.id}-sticky`}
                src={selectedVariant.image}
                alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      {isDetailView ? renderDetailView() : renderHeroView()}
    </div>
  );
}
