

"use client";
import { useEffect, useState, useRef } from "react";
import { Abril_Fatface } from "next/font/google";
import styles from "../../styles/home/HeroSection.module.css";
import Image from "next/image";

const abrilFatface = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [textDone, setTextDone] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // track image load separately
  const [imageVisible, setImageVisible] = useState(false);
  const [showBg, setShowBg] = useState(false);

  const heroRef = useRef(null);
  const textRefs = useRef([]); // for wrappers

  // Fade in background after hydration
  useEffect(() => {
    const t = setTimeout(() => setShowBg(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Intersection observer for text
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !textVisible) {
            setTextVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [textVisible]);

  // Watch for transitionend (not animationend) on both text wrappers
  useEffect(() => {
    if (!textVisible) return;

    let finished = 0;
    let done = false;
    const total = Math.max(1, textRefs.current.length);

    const markFinished = () => {
      if (done) return;
      finished++;
      if (finished >= total) {
        done = true;
        setTextDone(true);
      }
    };

    const handleEnd = (e) => {
      // count first transitionend per element
      markFinished();
    };

    textRefs.current.forEach((el) => {
      if (el) el.addEventListener("transitionend", handleEnd, { once: true });
    });

    // fallback timeout based on computed transition durations (safety)
    let fallbackMs = 0;
    textRefs.current.forEach((el) => {
      if (!el) return;
      const cs = window.getComputedStyle(el);
      const parseMs = (str) =>
        str
          .split(",")
          .map((s) => (parseFloat(s) || 0) * 1000)
          .filter((n) => !isNaN(n));
      const durations = parseMs(cs.transitionDuration);
      const delays = parseMs(cs.transitionDelay);
      const arr = durations.map((d, i) => d + (delays[i] ?? 0));
      const max = arr.length ? Math.max(...arr) : 0;
      fallbackMs = Math.max(fallbackMs, max);
    });

    const fallbackTimer = setTimeout(() => {
      if (!done) {
        done = true;
        setTextDone(true);
      }
    }, fallbackMs + 80);

    return () => {
      textRefs.current.forEach((el) => {
        if (el) el.removeEventListener("transitionend", handleEnd);
      });
      clearTimeout(fallbackTimer);
    };
  }, [textVisible]);

  // Wait for both textDone AND imageLoaded, then delay 2s, then show watch
  useEffect(() => {
    if (!(textDone && imageLoaded)) return;
    const t = setTimeout(() => setImageVisible(true), 1000); // 2s wait after text finished
    return () => clearTimeout(t);
  }, [textDone, imageLoaded]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`${styles.hero} ${showBg ? styles.bgVisible : ""}`}
      aria-label="Hero"
    >
      <div className={styles.content}>
        <div className={styles.heroContent}>
          {/* Watch */}
          <div
            className={`${styles.watchContainer} ${
              imageVisible ? styles.visible : ""
            }`}
          >
            <Image
              src="/images/front-brown.webp"
              alt="Evolution Geneve Luxury Watch"
              className={styles.watchImagePlain}
              fill
              priority
              onLoadingComplete={() => setImageLoaded(true)} // only mark loaded, don't make visible directly
              draggable={false}
            />
          </div>

          {/* Text */}
          <div className={`${styles.textContainer} ${abrilFatface.className}`}>
            <div
              ref={(el) => (textRefs.current[0] = el)}
              className={`${styles.textTop} ${textVisible ? styles.visible : ""}`}
            >
              <Image
                src="/images/inspires.webp"
                alt="When History Inspires"
                draggable={false}
                width={1400}
                height={400}
                priority
              />
            </div>
            <div
              ref={(el) => (textRefs.current[1] = el)}
              className={`${styles.textBottom} ${textVisible ? styles.visible : ""}`}
            >
              <Image
                src="/images/innovation.webp"
                alt="Innovation"
                draggable={false}
                width={1400}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
