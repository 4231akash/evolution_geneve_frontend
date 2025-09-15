"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/home/TechnicalSpecsSection.module.css";

const TechnicalSpecsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="specs" className={styles.techSection} ref={sectionRef}>
      {/* Background GIF only rendered when visible */}
      {isVisible && (
        <div
          className={styles.backgroundGif}
          style={{
            backgroundImage: `url("/videos/scroll_map.gif?key=${Date.now()}")`,
          }}
        />
      )}

      {/* Scroll/Image area (only shows on mobile/tablet via CSS) */}
      <div className={styles.scrollContainer}>
        {/* <div className={styles.scrollImageWrapper}>
          <img
            src="/images/map_data.svg"
            alt="Technical specifications scroll (map_data)"
            className={styles.scrollImage}
            draggable="false"
          />
        </div> */}
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
