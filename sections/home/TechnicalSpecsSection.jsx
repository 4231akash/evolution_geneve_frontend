// // import styles from "../../styles/home/TechnicalSpecsSection.module.css";

// // const TechnicalSpecsSection = () => {
// //   return (
// //     <section id="specs" className={styles.techSection}>
// //       {/* Background GIF (CSS handled) */}
// //       <div className={styles.backgroundGif} />

// //       {/* Scroll/Image area */}
// //       <div className={styles.scrollContainer}>
// //         {/* <div className={styles.scrollImageWrapper}>
// //           <img
// //             src="/images/map_data.svg"
// //             alt="Technical specifications scroll (map_data)"
// //             className={styles.scrollImage}
// //             draggable="false"
// //           />
// //         </div> */}
// //       </div>
// //     </section>
// //   );
// // };

// // export default TechnicalSpecsSection;



// import styles from "../../styles/home/TechnicalSpecsSection.module.css";

// const TechnicalSpecsSection = () => {
//   return (
//     <section id="specs" className={styles.techSection}>
//       {/* Background Video (with GIF fallback for older browsers) */}
//       <video
//         className={styles.backgroundVideo}
//         autoPlay
//         loop
//         muted
//         playsInline
//         poster="/videos/scroll_map.gif" // fallback poster image
//       >
//         <source src="/videos/scroll_desktop_video.mp4" type="video/mp4" />
//         {/* <source src="/videos/scroll_map.webm" type="video/webm" /> */}
//         {/* Fallback GIF if video unsupported */}
//         <img
//           src="/videos/scroll_map.gif"
//           alt="Technical specifications background"
//         />
//       </video>

//       {/* Scroll/Image area */}
//       <div className={styles.scrollContainer}>

//       </div>
//     </section>
//   );
// };

// export default TechnicalSpecsSection;



// "use client";
// import { useEffect, useState } from "react";
// import styles from "../../styles/home/TechnicalSpecsSection.module.css";

// const TechnicalSpecsSection = () => {
//   const [isMobile, setIsMobile] = useState(null);

//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   return (
//     <section id="specs" className={styles.techSection}>
//       {isMobile !== null && (
//         <video
//           key={isMobile ? "mobile" : "desktop"}
//           className={styles.backgroundVideo}
//           autoPlay
//           loop
//           muted
//           playsInline
//           poster="/videos/scroll_map.gif"
//         >
//           <source
//             src={isMobile ? "/videos/mobile_video.mp4" : "/videos/scroll_desktop_video.mp4"}
//             type="video/mp4"
//           />
//           <img
//             src="/videos/scroll_map.gif"
//             alt="Technical specifications background"
//           />
//         </video>
//       )}

//       <div className={styles.scrollContainer}></div>
//     </section>
//   );
// };

// export default TechnicalSpecsSection;


"use client";
import { useRef, useEffect } from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import styles from "../../styles/home/TechnicalSpecsSection.module.css";

const TechnicalSpecsSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Restart video from beginning when section enters viewport
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="specs" className={styles.techSection} ref={sectionRef}>
      <BackgroundVideo
        desktopSrc="/videos/scroll_desktop_video.mp4"
        mobileSrc="/videos/mobile_video.mp4"
        poster="/videos/scroll_map.gif"
        className={styles.backgroundVideo}
        ref={videoRef} // forwarded ref now works
      />

      <div className={styles.scrollContainer}>
        {/* Scroll image or content */}
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
