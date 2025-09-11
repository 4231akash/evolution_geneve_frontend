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

    const updatePin = () => {
      if (!sectionRef.current || !containerRef.current || !stickyRef.current || !imageRef.current)
        return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const stickyEl = stickyRef.current;
      const stickyHeight = stickyEl.offsetHeight;
      const topOffset = headerOffset;

      const isDesktop = window.innerWidth >= 769;

      const shouldPin =
        isDesktop &&
        sectionRect.top <= topOffset &&
        sectionRect.bottom > topOffset + stickyHeight;

      if (shouldPin) {
        containerRef.current.style.minHeight = `${stickyHeight}px`;
        stickyEl.style.position = "fixed";
        stickyEl.style.top = `${topOffset}px`;
        stickyEl.style.left = `${containerRect.left}px`;
        stickyEl.style.width = `${containerRect.width}px`;
        stickyEl.classList.add(styles.pinned);
      } else {
        containerRef.current.style.minHeight = "";
        stickyEl.style.position = "";
        stickyEl.style.top = "";
        stickyEl.style.left = "";
        stickyEl.style.width = "";
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
