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
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTextVisible(true);
            setImageVisible(true);
          } else {
            // Reset animation when scrolling out
            setTextVisible(false);
            setImageVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // 50% of the section is visible
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <section id="#hero" className={styles.hero} ref={heroRef}>
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

          {/* Text */}
          <div className={`${styles.textContainer} ${abrilFatface.className}`}>
            <h2
              className={`${styles.textTop} ${
                textVisible ? styles.visible : ""
              }`}
            >
              WHEN HISTORY
            </h2>
            <h2
              className={`${styles.textBottom} ${
                textVisible ? styles.visible : ""
              }`}
            >
              INSPIRES INNOVATION
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
