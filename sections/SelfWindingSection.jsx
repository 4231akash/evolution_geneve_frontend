import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/SandTimer.module.css";

import scrollImage from "../public/images/right_note.svg";
import watchBackImage from "../public/images/self_winding_watch.svg";
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const SelfWindingSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);
  const typingIntervalRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const fullText =
    "The early 20th century marked a turning point with the invention of the rotor system harnessed the motion of the wearer's wrist to power the winding mechanism. This pivotal innovation laid the foundation for what would become the automatic watch we know today. An automatic watch, also known as a self-winding watch or simply an automatic, is a mechanical watch where the natural motion of the wearer provides energy to wind the mainspring, making manual winding unnecessary if worn enough.";

  // Scroll handler
  const lerp = (start, end, amt) => start + (end - start) * amt;

  useEffect(() => {
    let current = 0; // smooth scroll progress
    let target = 0; // instant scroll value
    let rafId;

    const update = () => {
      current = lerp(current, target, 0.08); // smaller = more delay/smoothness
      setScrollProgress(current);

      if (Math.abs(current - target) > 0.001) {
        rafId = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH =
        window.innerHeight || document.documentElement.clientHeight;

      let raw = 1 - rect.top / windowH;
      raw = clamp(raw, 0, 1);
      target = easeInOutCubic(raw);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Typing logic
  useEffect(() => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (scrollProgress >= 0.95) {
      typingTimeoutRef.current = setTimeout(() => {
        typingIntervalRef.current = setInterval(() => {
          setDisplayedText((prev) => {
            if (prev.length < fullText.length)
              return fullText.slice(0, prev.length + 1);
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
            return prev;
          });
        }, 25);
      }, 100);
    } else if (scrollProgress <= 0.4) {
      typingIntervalRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length > 0) return fullText.slice(0, prev.length - 1);
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          return prev;
        });
      }, 15);
    }

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [scrollProgress, fullText]);

  // Derived transforms
  const leftTranslatePct = -110 + scrollProgress * 110; // image slides in from left
  const rightTranslatePct = 110 - scrollProgress * 110; // text slides in from right
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif2}></div>

      <div className={styles.contentWrapper}>
        {/* Left Content - Image */}
        <div
          className={styles.leftContent}
          style={{
            transform: `translateX(${leftTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <img
            src={"/images/self_winding_watch.svg"}
            alt="Sand Timer Watch"
            className={styles.watchImage}
          />
        </div>

        {/* Right Content - Scroll + Text */}
        <div
          className={styles.rightContent}
          style={{
            transform: `translateX(${rightTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
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
                {scrollProgress >= 0.95 &&
                  displayedText.length < fullText.length && (
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
