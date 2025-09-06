import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/Sundial.module.css";

// Make sure to replace these with your actual image paths in the /public folder
import bgImage from "../public/images/bg_manual_winding.svg";
import scrollImage from "../public/images/left_note.svg";
import watchBackImage from "../public/images/manual_winding_watch.svg";
import backgroundGif from "../public/videos/bg_manual_winding_video.gif";

const ManualWindingSection = () => {
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const sectionRef = useRef(null);

  const fullText =
    "Mechanical watches evolved in Europe in the 17th century from spring powered clocks, which appeared in the 15th century. A manual winding mechanical watch is driven by a mainspring which must be wound periodically by hand. Its force is transmitted through a series of gears to power the balance wheel, a weighted wheel which oscillates back and forth at a constant rate. A device called an escapement releases the watch's wheels to move forward a small amount with each swing of the balance wheel, moving the watch's hands forward at a constant rate.";

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
      <div className={styles.backgroundGif2}></div>

      <div className={styles.contentWrapper}>
        {/* Left Content */}
        <div
          className={`${styles.leftContent} ${isInView ? styles.inView : ""}`}
          style={{ "--parallax-x": `${scrollPosition * -1}px` }}
        >
          <div className={styles.scrollImageContainer}>
            <div className={styles.scrollImageWrapper}>
              <div className={styles.textOverlay}>
                <h2>The Manual Winding</h2>
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
            src="/images/manual_winding_watch.svg"
            alt="Back case of the Evolution Geneve watch"
            className={styles.watchImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ManualWindingSection;
