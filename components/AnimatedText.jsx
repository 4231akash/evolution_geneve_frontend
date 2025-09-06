// components/AnimatedText.js
import { useEffect, useState } from 'react';
import styles from '../styles/AnimatedText.module.css';

const AnimatedText = ({ text, direction = 'left', delay = 0, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onAnimationComplete]);

  return (
    <span 
      className={`${styles.animatedText} ${styles[direction]} ${isVisible ? styles.visible : ''}`}
    >
      {text}
    </span>
  );
};

export default AnimatedText;