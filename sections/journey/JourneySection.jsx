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
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, textBlocks.length);

    // ------------------- Text blocks animation -------------------
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inViewText);
          }
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

    // ------------------- Image animation -------------------
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageRef.current?.classList.add(styles.inViewImage);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -25% 0px" }
    );

    if (sectionRef.current) imageObserver.observe(sectionRef.current);

    // ------------------- Sticky pin/unpin logic -------------------
    let ticking = false;

    // inside your useEffect (once, before listeners), ensure container is positioned:
    if (containerRef.current) {
      // only set if not already positioned, so we don't override CSS the user might set
      const cs = window.getComputedStyle(containerRef.current);
      if (cs.position === "static")
        containerRef.current.style.position = "relative";
    }

    // Replace your updatePin with this:
    const updatePin = () => {
      if (
        !sectionRef.current ||
        !containerRef.current ||
        !stickyRef.current ||
        !imageRef.current
      )
        return;

      // make sure container is positioned relative so absolute inside it works
      if (getComputedStyle(containerRef.current).position === "static") {
        containerRef.current.style.position = "relative";
      }

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const stickyEl = stickyRef.current;
      const stickyHeight = stickyEl.offsetHeight;
      const topOffset = headerOffset;

      const isDesktop = window.innerWidth >= 769;

      // states
      const atTop = sectionRect.top > topOffset; // haven't hit the pin point yet
      const inMiddle =
        isDesktop &&
        sectionRect.top <= topOffset &&
        sectionRect.bottom > topOffset + stickyHeight;
      const atBottom = sectionRect.bottom <= topOffset + stickyHeight; // fully scrolled past

      if (!isDesktop) {
        // clean up on small screens
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
        // --- PIN MODE (fixed to viewport) ---
        containerRef.current.style.minHeight = `${stickyHeight}px`;
        stickyEl.style.position = "fixed";
        stickyEl.style.top = `${topOffset}px`;
        // align to container on the viewport
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.right = "";
        stickyEl.style.bottom = "";
        stickyEl.style.width = `${containerRect.width}px`;
        stickyEl.classList.add(styles.pinned);
      } else if (atBottom) {
        // --- SECTION SCROLLED PAST: freeze at section bottom ---
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "fixed";
        // Lock it at the point where the section bottom meets viewport
        stickyEl.style.top = `${sectionRect.bottom - stickyHeight}px`;
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.width = `${containerRect.width}px`;
        stickyEl.style.bottom = "";
        stickyEl.style.right = "";
        stickyEl.classList.remove(styles.pinned);
      } else if (atTop) {
        // --- BEFORE PIN START: normal flow inside container ---
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "relative";
        stickyEl.style.top = "";
        stickyEl.style.bottom = "";
        stickyEl.style.left = "";
        stickyEl.style.right = "";
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

  const sectionClasses = `${styles.journey} ${
    reverseLayout ? styles.journeyReverse : ""
  }`;

  return (
    <section className={sectionClasses} ref={sectionRef}>
      {/* TEXT SIDE */}
      <div className={styles.textContainer}>
        {textBlocks.map((text, i) => (
          <div
            key={i}
            className={styles.textBlock}
            ref={(el) => (textRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.2}s` }} // stagger
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
