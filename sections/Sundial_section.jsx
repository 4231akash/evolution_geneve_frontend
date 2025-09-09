// import { useEffect, useRef, useState } from "react";
// import styles from "../styles/Sundial.module.css";

// const easeInOutCubic = (t) =>
//   t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

// const SundialSection = () => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [scrollProgress, setScrollProgress] = useState(0); // 0..1
//   const sectionRef = useRef(null);
//   const rafRef = useRef(null);
//   const tickingRef = useRef(false);
//   const typingIntervalRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const fullText =
//     "In the history of sundials, the oldest sundial devices came from the ancient Egyptian shadow clock built around 1500BCE. The obelisks shadow clocks were created in an L shape and placed east to west amongst the cardinal points. This ancient form of time-telling was still used in rural parts of Egypt up until very recently, proving these sundals to be incredibly effective devices.";

//   // Scroll handler (RAF-based)
// const lerp = (start, end, amt) => start + (end - start) * amt;

// useEffect(() => {
//   let current = 0; // smooth scroll progress
//   let target = 0; // instant scroll value
//   let rafId;

//   const update = () => {
//     current = lerp(current, target, 0.08); // smaller = more delay/smoothness
//     setScrollProgress(current);

//     if (Math.abs(current - target) > 0.001) {
//       rafId = requestAnimationFrame(update);
//     }
//   };

//   const onScroll = () => {
//     if (!sectionRef.current) return;
//     const rect = sectionRef.current.getBoundingClientRect();
//     const windowH = window.innerHeight || document.documentElement.clientHeight;

//     let raw = 1 - rect.top / windowH;
//     raw = clamp(raw, 0, 1);
//     target = easeInOutCubic(raw);

//     cancelAnimationFrame(rafId);
//     rafId = requestAnimationFrame(update);
//   };

//   window.addEventListener("scroll", onScroll, { passive: true });
//   onScroll();

//   return () => {
//     window.removeEventListener("scroll", onScroll);
//     cancelAnimationFrame(rafId);
//   };
// }, []);


//   // Typing handler (trigger when scrollProgress ~1)
//   useEffect(() => {
//     // Clear previous intervals & timeouts
//     if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     if (scrollProgress >= 0.95) {
//       // Wait a bit after elements settle before typing
//       typingTimeoutRef.current = setTimeout(() => {
//         typingIntervalRef.current = setInterval(() => {
//           setDisplayedText((prev) => {
//             if (prev.length < fullText.length) return fullText.slice(0, prev.length + 1);
//             clearInterval(typingIntervalRef.current);
//             typingIntervalRef.current = null;
//             return prev;
//           });
//         }, 25);
//       }, 100); // small delay to make animation feel smooth
//     } else if (scrollProgress <= 0.4) {
//       // Delete text only when we scroll significantly back
//       typingIntervalRef.current = setInterval(() => {
//         setDisplayedText((prev) => {
//           if (prev.length > 0) return fullText.slice(0, prev.length - 1);
//           clearInterval(typingIntervalRef.current);
//           typingIntervalRef.current = null;
//           return prev;
//         });
//       }, 15);
//     }

//     return () => {
//       if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, [scrollProgress, fullText]);

//   // Derived styles
//   const leftTranslatePct = -110 + scrollProgress * 110;
//   const rightTranslatePct = 110 - scrollProgress * 110;
//   const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

//   return (
//     <section ref={sectionRef} className={styles.historySection}>
//       <div className={styles.backgroundGif}></div>

//       <div className={styles.contentWrapper}>
//         <div
//           className={styles.leftContent}
//           style={{
//             transform: `translateX(${leftTranslatePct}%)`,
//             opacity: visibleOpacity,
//             willChange: "transform, opacity",
//           }}
//         >
//           <div className={styles.scrollImageWrapper}>
//             <div className={styles.textOverlay}>
//               <h2>The Sundial</h2>
//               <p>
//                 {displayedText}
//                 {scrollProgress >= 0.95 && displayedText.length < fullText.length && (
//                   <span className={styles.typingCursor}>|</span>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div
//           className={styles.rightContent}
//           style={{
//             transform: `translateX(${rightTranslatePct}%)`,
//             opacity: visibleOpacity,
//             willChange: "transform, opacity",
//           }}
//         >
//           <img
//             src="/images/sundial_watch.svg"
//             alt="Back case of the Evolution Geneve watch"
//             className={styles.watchImage}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SundialSection;



import { useEffect, useRef, useState } from "react";
import styles from "../styles/Sundial.module.css";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

const lerp = (start, end, amt) => start + (end - start) * amt;

const SundialSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0..1
  const sectionRef = useRef(null);

  const fullText =
    "In the history of sundials, the oldest sundial devices came from the ancient Egyptian shadow clock built around 1500BCE. The obelisks shadow clocks were created in an L shape and placed east to west amongst the cardinal points. This ancient form of time-telling was still used in rural parts of Egypt up until very recently, proving these sundals to be incredibly effective devices.";

  // Scroll handler with RAF smoothing
  useEffect(() => {
    let current = 0;
    let target = 0;
    let rafId;

    const update = () => {
      current = lerp(current, target, 0.08);
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

  // Derived styles
  const leftTranslatePct = -110 + scrollProgress * 110;
  const rightTranslatePct = 110 - scrollProgress * 110;
  const visibleOpacity = clamp((scrollProgress - 0.05) / 0.45, 0, 1);

  return (
    <section ref={sectionRef} className={styles.historySection}>
      <div className={styles.backgroundGif}></div>

      <div className={styles.contentWrapper}>
        <div
          className={styles.leftContent}
          style={{
            transform: `translateX(${leftTranslatePct}%)`,
            opacity: visibleOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div className={styles.scrollImageWrapper}>
            <div className={styles.textOverlay}>
              <h2>The Sundial</h2>
              <p>{fullText}</p>
            </div>
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
          <img
            src="/images/sundial_watch.svg"
            alt="Back case of the Evolution Geneve watch"
            className={styles.watchImage}
          />
        </div>
      </div>
    </section>
  );
};

export default SundialSection;
