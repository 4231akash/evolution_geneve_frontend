

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../styles/home/Sundial.module.css";

import manualWatch from "../../public/images/manual_winding_watch.webp";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const lerp = (start, end, amt) => start + (end - start) * amt;

const ManualWindingSection = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const currentRef = useRef(0); // avoids re-render loops

  const fullText =
    "Mechanical watches evolved in Europe in the 17th century from spring powered clocks, which appeared in the 15th century. A manual winding mechanical watch is driven by a mainspring which must be wound periodically by hand. Its force is transmitted through a series of gears to power the balance wheel, a weighted wheel which oscillates back and forth at a constant rate. A device called an escapement releases the watch's wheels to move forward a small amount with each swing of the balance wheel, moving the watch's hands forward at a constant rate.";

  useEffect(() => {
    let target = 0;
    let rafId;

    const update = () => {
      const current = lerp(currentRef.current, target, 0.08);

      if (Math.abs(current - currentRef.current) > 0.0001) {
        currentRef.current = current;

        // ✅ only update React state when difference is noticeable
        setScrollProgress((prev) => {
          if (Math.abs(prev - current) > 0.001) {
            return current;
          }
          return prev;
        });

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

  // Toggle visibility based on progress
  useEffect(() => {
    if (scrollProgress >= 0.95) {
      setVisible(true);
    } else if (scrollProgress <= 0.4) {
      setVisible(false);
    }
  }, [scrollProgress]);

  // Derived styles
  const leftTranslatePct = -110 + scrollProgress * 110;
  const rightTranslatePct = 110 - scrollProgress * 110;
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif2}></div>

      <div className={styles.contentWrapper}>
        <div
          className={styles.leftContent}
          style={{
            transform: `translateX(${leftTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div className={styles.scrollImageWrapper3}>
            {/* <div className={styles.textOverlay}>
              <h2>The Manual Winding</h2>
              <p>{fullText}</p>
            </div> */}
          </div>
        </div>

        <div
          className={styles.rightContent}
          style={{
            transform: `translateX(${rightTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={manualWatch}
            alt="Manual winding watch back case"
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

export default ManualWindingSection;
