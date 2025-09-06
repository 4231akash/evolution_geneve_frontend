import { useState, useEffect, useRef } from "react";
import styles from "../styles/Sundial.module.css";
import Image from "next/image";
// ✅ Remove next/image for background
import scrollImage from "../public/images/left_note.svg";
import watchBackImage from "../public/images/sundial_watch.svg";

const SundialSection = () => {
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const sectionRef = useRef(null);

  const fullText =
    "In the history of sundials, the oldest sundial devices came from the ancient Egyptian shadow clock built around 1500BCE. The obelisks shadow clocks were created in an L shape and placed east to west amongst the cardinal points. This ancient form of time-telling was still used in rural parts of Egypt up until very recently, proving these sundals to be incredibly effective devices.";

  // Scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = -rect.top / (rect.height / 2);
        setScrollPosition(progress * 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for in-view animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typing / deleting animation
  useEffect(() => {
    let intervalId;
    if (isInView) {
      let i = displayedText.length;
      intervalId = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.substring(0, i + 1));
          i++;
        } else clearInterval(intervalId);
      }, 25);
    } else {
      let i = displayedText.length;
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
      {/* ✅ Background is now pure CSS */}
      <div className={styles.backgroundGif}></div>

      <div className={styles.contentWrapper}>
        {/* Left Content */}
        <div
          className={`${styles.leftContent} ${isInView ? styles.inView : ""}`}
          style={{ "--parallax-x": `${scrollPosition * -1}px` }}
        >
          <div className={styles.scrollImageContainer}>
            <div className={styles.scrollImageWrapper}>
              <div className={styles.textOverlay}>
                <h2>The Sundial</h2>
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

        {/* Right Content */}
        <div
          className={`${styles.rightContent} ${isInView ? styles.inView : ""}`}
          style={{ "--parallax-x": `${scrollPosition}px` }}
        >
          <img
            src="/images/sundial_watch.svg"
            alt="Back case of the Evolution Geneve watch"
            className={styles.watchImage}
          />
        </div>
      </div>
    </section>
  );
};

export default SundialSection;
