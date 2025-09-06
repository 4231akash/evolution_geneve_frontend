import { useState, useEffect } from 'react';
import styles from '../styles/ScrollIndicator.module.css';

const ScrollIndicator = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={styles.scrollIndicator} 
      onClick={isScrolled ? scrollToTop : scrollToBottom}
    >
      <i className={`fas fa-arrow-${isScrolled ? 'up' : 'down'}`}></i>
    </div>
  );
};

export default ScrollIndicator;