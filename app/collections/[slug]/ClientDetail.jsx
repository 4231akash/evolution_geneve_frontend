// app/collections/[slug]/ClientDetail.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/collections/Collections.module.css";
import Header from "../../../components/Header";

export default function ClientDetail({ initialVariant, variants }) {
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideInSpecs, setSlideInSpecs] = useState(false);
  // const [isZoomed, setIsZoomed] = useState(false);

  const sectionRef = useRef(null); // used for slide-in detection
  const containerRef = useRef(null); // wrapper that reserves space for sticky
  const stickyRef = useRef(null); // actual sticky element

  // keep local selectedVariant in-sync when server passes new initialVariant
  useEffect(() => {
    setSelectedVariant(initialVariant);
  }, [initialVariant]);

  // slide-in specs on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const triggerStart = window.innerHeight * 0.8;
      const triggerEnd = 300;
      setSlideInSpecs(rect.top < triggerStart && rect.bottom > triggerEnd);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // simple local image pop animation lifecycle
  useEffect(() => {
    if (isAnimating) {
      const t = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(t);
    }
  }, [isAnimating]);

  // sticky image pin logic (desktop only)
  useEffect(() => {
    const updatePin = () => {
      if (!sectionRef.current || !containerRef.current || !stickyRef.current)
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const wrapperRect =
        containerRef.current.parentElement.getBoundingClientRect();
      const stickyEl = stickyRef.current;
      const stickyHeight = stickyEl.offsetHeight;
      const topOffset = 80; // header height if needed
      const isMobile = window.innerWidth < 768;

      // ✅ Only reserve space on desktop
      if (!isMobile) {
        containerRef.current.style.minHeight = `${stickyHeight}px`;
      } else {
        containerRef.current.style.minHeight = "";
      }

      const bottomGap = isMobile ? 0 : 0;

      const shouldPin =
        wrapperRect.top <= topOffset &&
        wrapperRect.bottom > topOffset + stickyHeight + bottomGap;

      if (shouldPin) {
        stickyEl.style.position = "fixed";
        stickyEl.style.top = `${topOffset}px`;
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.width = `${containerRect.width}px`;
      } else if (wrapperRect.bottom <= topOffset + stickyHeight + bottomGap) {
        stickyEl.style.position = "absolute";
        stickyEl.style.top = "auto";
        stickyEl.style.bottom = `${bottomGap}px`;
        stickyEl.style.left = "0";
        stickyEl.style.width = "100%";
      } else {
        stickyEl.style.position = "relative";
        stickyEl.style.top = "";
        stickyEl.style.bottom = "";
        stickyEl.style.left = "0";
        stickyEl.style.width = "100%";
      }
    };

    window.addEventListener("scroll", updatePin);
    window.addEventListener("resize", updatePin);

    updatePin();

    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, [selectedVariant]);

  // selecting a swatch: animate locally then navigate to the slug for full canonical route
  const handleVariantSelect = (variant) => {
    if (!variant || variant.id === selectedVariant.id) return;

    // local instant visual feedback
    setSelectedVariant(variant);
    setIsAnimating(true);

    // navigate after the animation completes so URL & server content stay in sync
    setTimeout(() => {
      router.push(`/collections/${variant.id}`);
    }, 300);
  };

  // open/close zoom modal

  // ===========================
  // renderHeroViewMain (as you asked)
  // ===========================
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

          <div className={styles.swatchContainer2}>
            {variants.map((variant) => (
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

        <div
          className={`${styles.watchImageWrapper10} ${
            isAnimating ? styles.imagePop : ""
          }`}
        
          style={{ cursor: "pointer" }}
        >
          <Image
            key={selectedVariant.id}
            src={selectedVariant.image}
            alt={`${selectedVariant.name} watch with ${selectedVariant.strapColor} strap`}
            className={styles.watchImage}
            fill
            priority
          />
        </div>
      </div>

      {/* duplicate swatchContainer2 (you had this duplication in original snippet) */}
      <div className={styles.swatchContainer2}>
        {variants.map((variant) => (
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

  // ===========================
  // render (with specs + sticky image)
  // ===========================
  return (
    <>
      <Header />
      <div className={styles.overall}>
        {renderHeroViewMain()}

        <section className={styles.detailsSection}>
          <div className={styles.detailsContentWrapper} ref={sectionRef}>
            <div
              ref={sectionRef}
              className={`${styles.specsContainer} ${
                slideInSpecs ? styles.slideIn : ""
              }`}
            >
              <Link
                href="/collections"
                className={styles.backButton}
                style={{ textDecoration: "none" }}
              >
                &larr; Back to Collections
              </Link>

              <ul className={styles.specList} style={{ paddingTop: "2rem" }}>
                {selectedVariant.details.map((detail, idx) => (
                  <li key={idx}>
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
                  style={{
                    width: "100%",
                    maxWidth: 350,
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
