"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import logo from "../public/images/evolution_logo.svg";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loader state
  const router = useRouter();

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

  // ✅ handle navigation
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMenuOpen(false);     // close overlay instantly
    setLoading(true);       // show loader immediately
    window.scrollTo(0, 0);  // reset scroll to top
    router.push(path);      // navigate
  };

  return (
    <>
      <header className={`${styles.header} ${isHidden ? styles.hidden : ""}`}>
        {/* ✅ Logo */}
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Evolution Logo"
            fill
            className={styles.logo}
            priority
          />
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* ✅ Fullscreen Overlay Menu */}
        {menuOpen && (
          <div className={styles.overlay}>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <ul className={styles.overlayMenu}>
              <li>
                <Link
                  href="/"
                  prefetch
                  onClick={(e) => handleLinkClick(e, "/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  prefetch
                  onClick={(e) => handleLinkClick(e, "/journey")}
                >
                  Journey
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  prefetch
                  onClick={(e) => handleLinkClick(e, "/collections")}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/enquiry"
                  prefetch
                  onClick={(e) => handleLinkClick(e, "/enquiry")}
                >
                  Enquiry
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ✅ Loader Overlay */}
      {loading && (
        <div className={styles.pageLoader}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
};

export default Header;
