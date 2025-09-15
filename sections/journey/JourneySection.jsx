"use client";

import { useEffect, useRef } from "react";
import styles from "../../styles/journey/JourneySection.module.css";

const JourneySection = ({
  imageSrc,
  imageAlt,
  caption,
  captionTitle,
  textBlocks = [],
  reverseLayout = false,
  headerOffset = 80,
}) => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const textContainerRef = useRef(null); // ✅ new
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, textBlocks.length);

    // --- Text animation observer ---
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.inViewText);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -15% 0px" }
    );
    textRefs.current.forEach((el, i) => {
      if (el) {
        el.style.setProperty("--tx", reverseLayout ? "40px" : "-40px");
        textObserver.observe(el);
      }
    });

    // --- Image observer ---
    const imageObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          imageRef.current?.classList.add(styles.inViewImage);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -25% 0px" }
    );
    if (sectionRef.current) imageObserver.observe(sectionRef.current);

    // --- Sticky logic ---
    let ticking = false;

    if (containerRef.current) {
      const cs = window.getComputedStyle(containerRef.current);
      if (cs.position === "static") containerRef.current.style.position = "relative";
    }

    const updatePin = () => {
      if (
        !sectionRef.current ||
        !containerRef.current ||
        !stickyRef.current ||
        !imageRef.current ||
        !textContainerRef.current
      )
        return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const textRect = textContainerRef.current.getBoundingClientRect(); // ✅ text side height
      const stickyEl = stickyRef.current;
      const stickyHeight = stickyEl.offsetHeight;
      const topOffset = headerOffset;

      const isDesktop = window.innerWidth >= 769;

      const atTop = sectionRect.top > topOffset;
      const inMiddle =
        isDesktop &&
        sectionRect.top <= topOffset &&
        textRect.bottom > topOffset + stickyHeight; // ✅ stop at text bottom
      const atBottom = textRect.bottom <= topOffset + stickyHeight; // ✅ based on text end

      if (!isDesktop) {
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "";
        stickyEl.style.top = "";
        stickyEl.style.left = "";
        stickyEl.style.right = "";
        stickyEl.style.bottom = "";
        stickyEl.style.width = "";
        stickyEl.classList.remove(styles.pinned);
        return;
      }

      if (inMiddle) {
        containerRef.current.style.minHeight = `${stickyHeight}px`;
        stickyEl.style.position = "fixed";
        stickyEl.style.top = `${topOffset}px`;
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.width = `${containerRect.width}px`;
        stickyEl.classList.add(styles.pinned);
      } else if (atBottom) {
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "absolute"; // ✅ freeze inside container
        stickyEl.style.top = `${textContainerRef.current.offsetHeight - stickyHeight}px`;
        stickyEl.style.left = "0";
        stickyEl.style.width = "100%";
        stickyEl.classList.remove(styles.pinned);
      } else if (atTop) {
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "relative";
        stickyEl.style.top = "";
        stickyEl.style.left = "";
        stickyEl.style.width = "100%";
        stickyEl.classList.remove(styles.pinned);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updatePin();
          ticking = false;
        });
      }
    };

    const onImgLoad = () => updatePin();

    imageRef.current?.addEventListener("load", onImgLoad);
    imageRef.current?.addEventListener("error", onImgLoad);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    updatePin();

    return () => {
      textObserver.disconnect();
      imageObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      imageRef.current?.removeEventListener("load", onImgLoad);
      imageRef.current?.removeEventListener("error", onImgLoad);
      if (containerRef.current) containerRef.current.style.minHeight = "";
      if (stickyRef.current) {
        stickyRef.current.style.position = "";
        stickyRef.current.style.top = "";
        stickyRef.current.style.left = "";
        stickyRef.current.style.width = "";
      }
    };
  }, [textBlocks.length, reverseLayout, headerOffset]);

  const sectionClasses = `${styles.journey} ${reverseLayout ? styles.journeyReverse : ""}`;

  return (
    <section className={sectionClasses} ref={sectionRef}>
      {/* TEXT SIDE */}
      <div className={styles.textContainer} ref={textContainerRef}>
        {textBlocks.map((text, i) => (
          <div
            key={i}
            className={styles.textBlock}
            ref={(el) => (textRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* IMAGE SIDE */}
      <div className={styles.imageContainer} ref={containerRef}>
        <div className={styles.stickyWrapper} ref={stickyRef}>
          <img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            className={styles.profileImage}
          />
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
