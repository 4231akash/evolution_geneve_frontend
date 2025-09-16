"use client";
import { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";

const BackgroundVideo = forwardRef(({ desktopSrc, mobileSrc, poster, className }, ref) => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile === null) return null; // wait until client knows screen size

  return (
    <video
      ref={ref} // attach forwarded ref
      key={isMobile ? "mobile" : "desktop"}
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${className || ""}`}
      muted
      playsInline
      preload="auto"
      loop={false} // disable native loop, we control restart
    >
      <source src={isMobile ? mobileSrc : desktopSrc} type="video/mp4" />
      {/* fallback for very old browsers */}
      <img src={poster} alt="Background fallback" />
    </video>
  );
});

BackgroundVideo.propTypes = {
  desktopSrc: PropTypes.string.isRequired,
  mobileSrc: PropTypes.string.isRequired,
  poster: PropTypes.string,
  className: PropTypes.string,
};

export default BackgroundVideo;
