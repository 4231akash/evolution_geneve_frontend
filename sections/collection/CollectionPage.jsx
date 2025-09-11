"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/collections/Collections.module.css";

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
    model: "EV001 X",
    material: "STAINLESS STEEL",
    strapColor: "Orange",
    image: "/images/orange_main.png",
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

  const renderHeroView = () => (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <p className={styles.brandTitle}>EVOLUTION GENÈVE</p>
        <div
          className={styles.watchImageWrapper}
          onClick={() => setIsDetailView(true)}
          onMouseEnter={() => setHideInfo(true)} // 👈 hide on hover
          onMouseLeave={() => setHideInfo(false)} // 👈 show back
        >
          <img
            key={selectedVariant.id}
            src={selectedVariant.image}
            alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
            className={styles.watchImage}
          />

          <div className={styles.watchInfo2}>
            <h2>{selectedVariant.name}</h2>
            <p>{selectedVariant.model}</p>
            <p>{selectedVariant.material}</p>
            <span>Limited to 600 pieces</span>
          </div>
        </div>

        {/* Conditionally render / hide this block */}
        {!hideInfo && (
          <div className={styles.watchInfo}>
            <h2>{selectedVariant.name}</h2>
            <p>{selectedVariant.model}</p>
            <p>{selectedVariant.material}</p>
            <span>Limited to 600 pieces</span>
          </div>
        )}

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
      </div>
    </section>
  );
  const renderHeroViewMain = () => (
    <section className={styles.heroSection}>
      <div className={styles.heroContent2}>
        <div className={styles.watchInfo}>
          <h2>{selectedVariant.name}</h2>
          <p>{selectedVariant.model}</p>
          <p>{selectedVariant.material}</p>
          <span>Limited to 600 pieces</span>
        </div>
        <div
          className={`${styles.watchImageWrapper} ${
            isAnimating ? styles.imagePop : ""
          }`}
          onClick={() => setIsDetailView(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            key={selectedVariant.id}
            src={selectedVariant.image}
            alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
          />
        </div>
      </div>
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
    </section>
  );
  const renderDetailView = () => (
    <div>
      {renderHeroViewMain()}

      <section className={styles.detailsSection}>
        <div className={styles.detailsContentWrapper}>
          <div className={styles.specsContainer}>
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

          <div className={styles.stickyImageContainer}>
            <div className={styles.stickyWrapper}>
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
