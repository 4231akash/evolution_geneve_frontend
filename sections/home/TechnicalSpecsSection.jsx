// import styles from "../../styles/home/TechnicalSpecsSection.module.css";

// const TechnicalSpecsSection = () => {
//   return (
//     <section id="specs" className={styles.techSection}>
//       {/* Background GIF (CSS handled) */}
//       <div className={styles.backgroundGif} />

//       {/* Scroll/Image area */}
//       <div className={styles.scrollContainer}>
//         {/* <div className={styles.scrollImageWrapper}>
//           <img
//             src="/images/map_data.svg"
//             alt="Technical specifications scroll (map_data)"
//             className={styles.scrollImage}
//             draggable="false"
//           />
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default TechnicalSpecsSection;



import styles from "../../styles/home/TechnicalSpecsSection.module.css";

const TechnicalSpecsSection = () => {
  return (
    <section id="specs" className={styles.techSection}>
      {/* Background Video (with GIF fallback for older browsers) */}
      <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/scroll_map.gif" // fallback poster image
      >
        <source src="/videos/scroll_desktop_video.mp4" type="video/mp4" />
        {/* <source src="/videos/scroll_map.webm" type="video/webm" /> */}
        {/* Fallback GIF if video unsupported */}
        <img
          src="/videos/scroll_map.gif"
          alt="Technical specifications background"
        />
      </video>

      {/* Scroll/Image area */}
      <div className={styles.scrollContainer}>
        {/* Uncomment if needed */}
        {/* <div className={styles.scrollImageWrapper}>
          <img
            src="/images/map_data.svg"
            alt="Technical specifications scroll (map_data)"
            className={styles.scrollImage}
            draggable="false"
          />
        </div> */}
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
