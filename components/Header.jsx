import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import logo from "../public/images/evolution_logo.svg";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${isHidden ? styles.hidden : ""}`}>

        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Evolution Logo"
            fill // ✅ makes it responsive inside the container
            className={styles.logo}
            priority
          />
        </div>

      {/* ✅ Navigation Menu */}
      {/* <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#hero" className={styles.navLink}>
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#parallax" className={styles.navLink}>
              History
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#split-layout" className={styles.navLink}>
              Mechanics
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#section4" className={styles.navLink}>
              Modern
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#section5" className={styles.navLink}>
              Future
            </a>
          </li>
        </ul>
      </nav> */}

      {/* ✅ Mobile Menu Button */}
      <button className={styles.mobileMenuBtn}>
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
};

export default Header;
