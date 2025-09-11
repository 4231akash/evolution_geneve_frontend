import styles from "../../styles/home/TechnicalSpecsSection.module.css";

const TechnicalSpecsSection = () => {
  return (
    <section id="specs" className={styles.techSection}>
      {/* Background GIF (CSS handled) */}
      <div className={styles.backgroundGif} />

      {/* Scroll/Image area */}
      <div className={styles.scrollContainer}>
        <div className={styles.scrollImageWrapper}>
          <img
            src="/images/map_data.svg"
            alt="Technical specifications scroll (map_data)"
            className={styles.scrollImage}
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
