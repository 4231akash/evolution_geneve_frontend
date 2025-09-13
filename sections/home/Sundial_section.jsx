"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/home/Sundial.module.css";
import Image from "next/image"; // ✅ Next.js Image

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

const lerp = (start, end, amt) => start + (end - start) * amt;

const SundialSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0..1
  const sectionRef = useRef(null);
  const currentRef = useRef(0); // ✅ store animated progress without re-rendering

  const fullText =
    "In the history of sundials, the oldest sundial devices came from the ancient Egyptian shadow clock built around 1500BCE. The obelisks shadow clocks were created in an L shape and placed east to west amongst the cardinal points. This ancient form of time-telling was still used in rural parts of Egypt up until very recently, proving these sundials to be incredibly effective devices.";

  useEffect(() => {
    let target = 0;
    let rafId;

    const update = () => {
      const next = lerp(currentRef.current, target, 0.08);

      if (Math.abs(next - currentRef.current) > 0.0001) {
        currentRef.current = next;
        setScrollProgress(next); // ✅ triggers React only when needed
        rafId = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      let raw = 1 - rect.top / window.innerHeight;
      raw = clamp(raw, 0, 1);
      target = easeInOutCubic(raw);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Derived styles
  const leftTranslatePct = -110 + scrollProgress * 110;
  const rightTranslatePct = 110 - scrollProgress * 110;
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif}></div>

      <div className={styles.contentWrapper}>
        {/* Left side: Text */}
        <div
          className={styles.leftContent}
          style={{
            transform: `translateX(${leftTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div className={styles.scrollImageWrapper}>
            {/* <div className={styles.textOverlay}>
              <h2>The Sundial</h2>
              <p>{fullText}</p>
            </div> */}
          </div>
        </div>

        {/* Right side: Watch image */}
        <div
          className={styles.rightContent}
          style={{
            transform: `translateX(${rightTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/images/sundial_watch.webp"
            alt="Back case of the Evolution Geneve watch"
            className={styles.watchImage}
            width={540}
            height={900}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default SundialSection;
