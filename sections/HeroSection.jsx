"use client";
import { useEffect, useState, useRef } from "react";
import { Abril_Fatface } from "next/font/google";
import styles from "../styles/HeroSection.module.css";

const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const heroRef = useRef(null);

  // ✅ Fix: delay background activation slightly after hydration
  useEffect(() => {
    const t = setTimeout(() => setShowBg(true), 100); // small delay prevents hydration glitch
    return () => clearTimeout(t);
  }, []);

  // Intersection observer for text + watch animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !textVisible) {
            setTextVisible(true);
            setTimeout(() => setImageVisible(true), 1200); // stagger watch reveal
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [textVisible]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`${styles.hero} ${showBg ? styles.bgVisible : ""}`}
      aria-label="Hero"
    >
      <div className={styles.content}>
        <div className={styles.heroContent}>
          {/* Watch Image */}
          <div
            className={`${styles.watchContainer} ${
              imageVisible ? styles.visible : ""
            }`}
          >
            <img
              src="/images/watch_main.svg"
              alt="Evolution Geneve Luxury Watch"
              className={styles.watchImagePlain}
              width="1200"
              height="1200"
              draggable="false"
            />
          </div>

          {/* Text Images */}
          <div className={`${styles.textContainer} ${abrilFatface.className}`}>
            <img
              src="/images/inspires.svg"
              alt="When History Inspires"
              className={`${styles.textTop} ${
                textVisible ? styles.visible : ""
              }`}
              draggable="false"
            />
            <img
              src="/images/innovation.svg"
              alt="Innovation"
              className={`${styles.textBottom} ${
                textVisible ? styles.visible : ""
              }`}
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
