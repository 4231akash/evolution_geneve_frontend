

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../styles/home/Sundial.module.css";

import watchImage from "../../public/images/sand_timer_watch.webp";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

const lerp = (start, end, amt) => start + (end - start) * amt;

const SandTimerSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const currentRef = useRef(0); // store current animation value
  const rafIdRef = useRef(null); // track RAF id

  const fullText =
    "An hourglass (or sandglass, sand timer, or sand clock) is known to have existed in Babylon and Egypt as early as the 16th century BCE. It is a device used to measure the passage of time. It comprises two glass bulbs connected vertically by a narrow neck that allows a regulated flow of a substance (historically sand) from the upper bulb to the lower one by gravity. Typically, the upper and lower bulbs are symmetric so that the hourglass will measure the same duration regardless of orientation.";

  useEffect(() => {
    let target = 0;

    const update = () => {
      const current = lerp(currentRef.current, target, 0.08);

      if (Math.abs(current - currentRef.current) > 0.0001) {
        currentRef.current = current;

        // ✅ Only update state when visibly different
        setScrollProgress((prev) => {
          if (Math.abs(prev - current) > 0.001) {
            return current;
          }
          return prev;
        });

        rafIdRef.current = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      let raw = 1 - rect.top / window.innerHeight;
      raw = clamp(raw, 0, 1);
      target = easeInOutCubic(raw);

      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize once

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Derived transforms
  const leftTranslatePct = -110 + scrollProgress * 110;
  const rightTranslatePct = 110 - scrollProgress * 110;
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif3}></div>

      <div className={styles.contentWrapper}>
        {/* Left Content - Watch Image */}
        <div
          className={styles.leftContent}
          style={{
            transform: `translateX(${leftTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={watchImage}
            alt="Sand Timer Watch"
            className={styles.watchImage}
            width={540}
            height={900}
            priority
          />
        </div>

        {/* Right Content - Text Overlay */}
        <div
          className={styles.rightContent}
          style={{
            transform: `translateX(${rightTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div className={styles.scrollImageWrapper2}>
            {/* <div className={styles.textOverlay}>
              <h2>The Sand Timer</h2>
              <p>{fullText}</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SandTimerSection;
