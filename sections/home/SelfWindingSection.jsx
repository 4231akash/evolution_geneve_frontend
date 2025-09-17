

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../../styles/home/Sundial.module.css";
import selfWindingWatch from "../../public/images/self_winding_watch.webp"; // ✅ Import for Next Image

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

const SelfWindingSection = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
    const currentRef = useRef(0); // ✅ Added missing ref

  const fullText =
    "The early 20th century marked a turning point with the invention of the rotor system harnessed the motion of the wearer's wrist to power the winding mechanism. This pivotal innovation laid the foundation for what would become the automatic watch we know today. An automatic watch, also known as a self-winding watch or simply an automatic, is a mechanical watch where the natural motion of the wearer provides energy to wind the mainspring, making manual winding unnecessary if worn enough.";

  const lerp = (start, end, amt) => start + (end - start) * amt;

  useEffect(() => {
    let current = 0;
    let target = 0;
    let rafId;

const update = () => {
  const next = lerp(currentRef.current, target, 0.08);

  if (Math.abs(next - currentRef.current) > 0.0001) {
    currentRef.current = next;

    // ✅ Only update React state when it's meaningfully different
    setScrollProgress((prev) => {
      if (Math.abs(prev - next) > 0.001) {
        return next;
      }
      return prev;
    });

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

  useEffect(() => {
    if (scrollProgress >= 0.95) {
      setVisible(true);
    } else if (scrollProgress <= 0.4) {
      setVisible(false);
    }
  }, [scrollProgress]);

  const leftTranslatePct = -110 + scrollProgress * 110; // image slides in from left
  const rightTranslatePct = 110 - scrollProgress * 110; // text slides in from right
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif_4}></div>

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
          {/* ✅ Converted <img> to Next.js Image */}
          <Image
            src={selfWindingWatch}
            alt="Self Winding Watch"
            className={styles.watchImage}
            width={540} // approximate width from CSS max-width
            height={900} // approximate height from CSS max-height / 95vh
            priority
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
          <div className={styles.scrollImageWrapper4}>
            {/* <div className={styles.textOverlay}>
               <h2>The Self Winding</h2>
              <p>{fullText}</p>
            </div> */}
          </div>
          {/* <div className={styles.scrollImageContainer}>
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
              <p>{fullText}</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SelfWindingSection;
