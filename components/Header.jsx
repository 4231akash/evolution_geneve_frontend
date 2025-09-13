"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import styles from "../styles/Header.module.css";
import logo from "../public/images/evolution_logo.svg";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0); // ✅ ref instead of state
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Scroll hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 200 && !isHidden) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current && isHidden) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]); // ✅ only depends on isHidden

  // Link click: close menu immediately + show loader
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMenuOpen(false);
    setLoading(true);
    window.scrollTo(0, 0);
    router.push(path);
  };

  // Hide loader when pathname changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <>
      <header className={`${styles.header} ${isHidden ? styles.hidden : ""}`}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Evolution Logo" fill className={styles.logo} priority />
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen(true)}>
          <i className="fas fa-bars"></i>
        </button>

        {menuOpen && (
          <div className={styles.overlay}>
            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>×</button>
            <ul className={styles.overlayMenu}>
              <li><Link href="/" prefetch onClick={(e) => handleLinkClick(e, "/")}>Home</Link></li>
              <li><Link href="/journey" prefetch onClick={(e) => handleLinkClick(e, "/journey")}>Journey</Link></li>
              <li><Link href="/collections" prefetch onClick={(e) => handleLinkClick(e, "/collections")}>Collections</Link></li>
              <li><Link href="/enquiry" prefetch onClick={(e) => handleLinkClick(e, "/enquiry")}>Enquiry</Link></li>
            </ul>
          </div>
        )}
      </header>

      {loading && (
        <div className={styles.pageLoader}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
};

export default Header;
