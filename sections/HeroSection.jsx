"use client";
import { useEffect, useState, useRef } from "react";
import { Abril_Fatface } from "next/font/google";
import styles from "../styles/HeroSection.module.css";

const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const heroRef = useRef(null);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = "/images/banner_main.svg";
    img.onload = () => setBgLoaded(true);
  }, []);

  // IntersectionObserver only triggers after background is loaded
  useEffect(() => {
    if (!bgLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!textVisible) {
              setTextVisible(true);
              setTimeout(() => setImageVisible(true), 1200); // delay watch image animation
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [bgLoaded, textVisible]);

  return (
    <section
      id="hero"
      className={styles.hero}
      ref={heroRef}
      data-bg="/images/banner_main.svg"
      style={{
        backgroundColor: bgLoaded ? "#D9D9D9B0" : "black",
        backgroundImage: bgLoaded ? 'url("/images/banner_main.svg")' : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
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
              width="500"
              height="500"
              draggable="false"
            />
          </div>

          {/* Image-based Text */}
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
