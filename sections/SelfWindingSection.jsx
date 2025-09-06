import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/SandTimer.module.css";

import scrollImage from "../public/images/right_note.svg";
import watchBackImage from "../public/images/self_winding_watch.svg";

const SelfWindingSection = () => {
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const sectionRef = useRef(null);

  const fullText =
    "The early 20th century marked a turning point with the invention of the rotor system harnessed the motion of the wearer's wrist to power the winding mechanism. This pivotal innovation laid the foundation for what would become the automatic watch we know today. An automatic watch, also known as a self-winding watch or simply an automatic, is a mechanical watch where the natural motion of the wearer provides energy to wind the mainspring, making manual winding unnecessary if worn enough.";

  // --- Scroll handler for parallax ---
  const handleScroll = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height / 2);
      setScrollPosition(progress * 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Intersection Observer for animation trigger ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // --- Typing / deleting animation ---
  useEffect(() => {
    let intervalId;
    let i = displayedText.length;

    if (isInView) {
      intervalId = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.substring(0, i + 1));
          i++;
        } else clearInterval(intervalId);
      }, 25);
    } else {
      intervalId = setInterval(() => {
        if (i > 0) {
          setDisplayedText(fullText.substring(0, i - 1));
          i--;
        } else clearInterval(intervalId);
      }, 15);
    }

    return () => clearInterval(intervalId);
  }, [isInView]);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      {/* ✅ Background handled in CSS */}
      <div className={styles.backgroundGif2}></div>

      <div className={styles.contentWrapper}>
        <div
          className={`${styles.leftContent} ${isInView ? styles.inView : ""}`}
          style={{ "--parallax-x": `${scrollPosition}px` }}
        >
          <img
            src={"/images/self_winding_watch.svg"}
            alt="Sand Timer Watch"
            className={styles.watchImage}
            // width={400}
            // height={400}
          />
        </div>

        <div
          className={`${styles.rightContent} ${isInView ? styles.inView : ""}`}
          style={{ "--parallax-x": `${scrollPosition * -1}px` }}
        >
          <div className={styles.scrollImageContainer}>
            <div className={styles.scrollImageWrapper}>
              <Image
                src={scrollImage}
                alt="Scroll"
                fill
                className={styles.scrollImage}
                priority
              />
            </div>

            <div className={styles.textOverlay}>
              <h2>The Self Winding</h2>
              <p>
                {displayedText}
                {isInView && displayedText.length < fullText.length && (
                  <span className={styles.typingCursor}>|</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfWindingSection;
